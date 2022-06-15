import axios from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

export interface ApiSearchResponse {
  response: {
    status: string;
    userTier: string;
    total: Number;
    startIndex: Number;
    pageSize: Number;
    currentPage: Number;
    pages: Number;
    orderBy: string;
    results: Array<NewsItem>;
  };
}

export interface ApiGetByIdResponse {
  response: {
    status: string;
    userTier: string;
    total: Number;
    content: NewsItem;
  };
}

export interface NewsItemByGroup {
  group: string;
  newsItem: Array<NewsItem>;
}

export interface NewsItem {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: {
    thumbnail?: string;
    bodyText: string;
    headline: string;
    body: string;
  };
  isHosted: Boolean;
  pillarId: string;
  pillarName: string;
}

class AppStore {
  topStories: NewsItem[] = [];
  newsItem: NewsItem[] = [];
  searchItem: NewsItem[] = [];
  newItemByGroups: NewsItemByGroup[] = [];
  articleItem: NewsItem | null = null;
  searchKeyword: string = '';
  articleByBookmark: NewsItem[] = [];
  currentPage: number = 1;
  isLoading: boolean = true;
  sorting: string = 'newest';
  private bookmarkList: string[] = [];
  private apiKey: string = process.env.REACT_APP_G_API_KEY ?? '';
  private baseUrl: string = `https://content.guardianapis.com`;
  private axiosConfig = {
    method: 'get',
  };

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage();
  }

  setSorting(sort: string) {
    this.sorting = sort;
  }

  setSearchKeyword(keyword: string) {
    this.searchKeyword = keyword;
  }

  async loadArticleById(id: string): Promise<void> {
    this.articleItem = null;
    this.isLoading = true;
    const data = await this.fetchById(id);

    runInAction(() => {
      this.articleItem = data;
      this.isLoading = false;
    });
  }

  addToBookmark(id: string) {
    this.bookmarkList.push(id);
    this.saveToLocalStorage(this.bookmarkList);
  }

  removeFromBookmark(id: string) {
    const newBookMarkList = this.bookmarkList.filter(
      (idInList) => idInList != id
    );
    this.bookmarkList = newBookMarkList;
    this.saveToLocalStorage(this.bookmarkList);
  }

  isBookmarkExist(id: string): boolean {
    const result = this.bookmarkList.findIndex((item) => item == id);
    return result !== -1;
  }

  async loadArticlesInBookMark() {
    this.isLoading = true;
    const promise: Array<Promise<NewsItem | null>> = [];

    const tempItems: NewsItem[] = [];

    for (const id of this.bookmarkList) {
      promise.push(this.fetchById(id));
    }

    const data = await Promise.all(promise);
    data.forEach((item) => {
      if (item)
        tempItems.push({
          ...item,
          webPublicationDate: new Date(item.webPublicationDate),
        });
    });

    let sortedResult: NewsItem[] = [];
    if (this.sorting === 'newest') {
      sortedResult = tempItems.sort(
        (a, b) => b.webPublicationDate.valueOf() - a.webPublicationDate.valueOf()
      );
    } else {
      sortedResult = tempItems.sort(
        (a, b) => a.webPublicationDate.valueOf() - b.webPublicationDate.valueOf()
      );
    }

    runInAction(() => {
      this.articleByBookmark = sortedResult;
      this.isLoading = false;
    });
  }

  async getSearchByKeyword(page: number, keyword?: string): Promise<void> {
    this.isLoading = true;
    const data = await this.fetch('news', 9, page, keyword);
    runInAction(() => {
      this.searchItem = data;
      this.isLoading = false;
    });
  }

  async getSearchByKeywordNextPage(
    page: number,
    keyword?: string
  ): Promise<void> {
    const data = await this.fetch('news', 9, page, keyword);
    runInAction(() => {
      for (const temp of data) {
        this.searchItem.push(temp);
      }
    });
  }

  async getTopStories(orderBy?: string): Promise<void> {
    this.isLoading = true;
    const data = await this.fetch('news', 8);
    runInAction(() => {
      this.topStories = data;
      this.isLoading = false;
    });
  }

  async getNewsByCategoryBase(categories: string): Promise<void> {
    this.isLoading = true;
    const cateInArr = categories.split('|');
    const tempItems: NewsItemByGroup[] = [];
    const promise: Array<Promise<NewsItem[]>> = [];

    for (const category of cateInArr) {
      promise.push(this.fetch(category, 3));
    }

    const result = await Promise.all(promise);
    cateInArr.forEach((category, idx) => {
      tempItems.push({
        group: category,
        newsItem: result[idx],
      });
    });

    runInAction(() => {
      this.newItemByGroups = tempItems;
      this.isLoading = false;
    });
  }

  private async fetch(
    section: string,
    pageSize: number = 8,
    page: number = 1,
    keyword?: string | null
  ): Promise<NewsItem[]> {
    try {
      const url =
        `/search?section=${section}` +
        `&api-key=${this.apiKey}` +
        `&show-fields=thumbnail,bodyText` +
        `&page-size=${pageSize}` +
        `&page=${page}` +
        `${keyword ? '&q=' + keyword : ''}` +
        `&order-by=${this.sorting}`;
      const { data } = await axios.get<ApiSearchResponse>(
        this.baseUrl + url,
        this.axiosConfig
      );

      return data.response.results;
      // this.setNews(data.response.results);
    } catch (error) {
      // TODO:: Implement catch here...
      return [];
    }
  }

  private async fetchById(id: string): Promise<NewsItem | null> {
    try {
      const url = `/${id}?api-key=${this.apiKey}&show-fields=thumbnail,bodyText,headline,body`;
      const { data } = await axios.get<ApiGetByIdResponse>(
        this.baseUrl + url,
        this.axiosConfig
      );

      return data.response.content;
      // this.setNews(data.response.results);
    } catch (error) {
      // TODO:: Implement catch here...
      return null;
    }
  }

  private saveToLocalStorage(ids: string[]): void {
    localStorage.setItem('bookmark', ids.join('|'));
  }

  private loadFromLocalStorage(): void {
    const bookmarkString = localStorage.getItem('bookmark') as string;
    if (bookmarkString) this.bookmarkList = bookmarkString.split('|');
    else this.bookmarkList = [];
  }
}

const appStore = new AppStore();
export default appStore;
