import * as React from 'react';
import styles from './dropdown.module.css';

interface IDropdownItem {
  value: string;
  text: string;
}

interface IDropdownProps {
  list: IDropdownItem[];
  onSelectedChange: (sort: string) => void;
}

export const Dropdown = (props: IDropdownProps): JSX.Element => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const [list, setList] = React.useState<IDropdownItem[]>([]);
  const [selected, setSelected] = React.useState<IDropdownItem>();

  React.useEffect(() => {
    setSelected(props.list[0]);
  }, []);

  React.useEffect(() => {
    if (selected) props.onSelectedChange(selected?.value);
  }, [selected]);

  const handleSelectClick = (item: IDropdownItem) => {
    setSelected(item);
    setIsShow(false);
  };

  return (
    <>
      <div
        className={`${styles.dd_container} ${
          isShow ? styles.active : styles.inactive
        }`}
      >
        <div className={styles.dd_box} onClick={() => setIsShow(!isShow)}>
          <span>{selected?.text}</span>
          <span>▼</span>
        </div>
        <div className={`${styles.dd_list_container}`}>
          {props.list.map((item, idx) => {
            return (
              <button
                key={item.value}
                className={styles.dd_btn}
                onClick={() => handleSelectClick(item)}
              >
                <span>{item.text}</span>
                {idx == 0 && <span>▲</span>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dropdown;
