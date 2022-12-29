import React, { useEffect, useState } from "react";
import "./style.css";
const TodoInput = () => {
  const localStorageData = localStorage.getItem("data");
  const initialValue = JSON.parse(localStorageData);
  const [inputText, setInputText] = useState(initialValue);
  const [tempData, setTempData] = useState(inputText);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [count, setCount] = useState();
  const handleChange = (e) => {
    setInputText((state) => [
      ...state.map((item) => {
        if (item.id === Number(e.target.id)) {
          return { ...item, title: e.target.value };
        } else {
          return item;
        }
      }),
    ]);
  };
  const handleSubmit = (e) => {
    if (e.which === 13) {
      setInputText((prev) => {
        return [
          ...prev,
          {
            title: e.target.value,
            id: prev.length,
            isEditing: false,
            isComplete: false,
          },
        ];
      });
    }
  };

  const handleDoubleClick = (data) => {
    setInputText((state) => [
      ...state.map((item) => {
        if (item.id === data.id) {
          return { ...item, isEditing: !data.isEditing };
        } else {
          return item;
        }
      }),
    ]);
  };
  const handelAll = () => {
    setTempData(inputText);
  };
  const handelActive = () => {
    setTempData(inputText.filter((item) => !item.isComplete));
  };
  const handelComplete = () => {
    setTempData(inputText.filter((item) => item.isComplete));
  };

  const handleCloseInput = (e) => {
    if (e.which === 13) {
      const newData = [...inputText];
      newData[e.target.id].isEditing = false;
      setInputText(newData);
    }
  };
  const handleClose = (e) => {
    setInputText((prev) =>
      prev.filter((item) => item.id !== Number(e.target.id))
    );
  };

  const handleCheck = (index) => {
    const newData = [...inputText];
    newData[index].isComplete = !newData[index].isComplete;
    setInputText(newData);
  };

  const handleSelectAll = () => {
    setInputText((state) => [
      ...state.map((item) => {
        return { ...item, isComplete: !isCheckAll };
      }),
    ]);
    setIsCheckAll(!isCheckAll);
  };
  const handleDelete = () => {
    setInputText((prev) => prev.filter((item) => !item.isComplete));
  };

  useEffect(() => {
    setCount(
      inputText.reduce((sum, b) => {
        if (b.isComplete) {
          return sum + 1;
        } else {
          return sum;
        }
      }, 0)
    );
    setTempData(inputText);
    localStorage.setItem("data", JSON.stringify(inputText));
  }, [inputText]);
  return (
    <div>
      <div className="header-box">
        <input
          type="checkbox"
          className="selectAll-button"
          name="selectAll"
          onClick={handleSelectAll}
        />
        <input
          type="text"
          className="input-placeholder"
          placeholder="What needs to be done?"
          onKeyDown={handleSubmit}
        />
      </div>
      <div className="todo-container">
        {tempData.map((item, index) => {
          return item.isEditing ? (
            <input
              className="input-placeholder"
              id={index}
              value={item.title}
              key={index}
              onDoubleClick={() => handleDoubleClick(item)}
              onChange={handleChange}
              onKeyDown={handleCloseInput}
            />
          ) : (
            <>
              <div
                className={
                  item.isComplete ? "complete inComplete" : "inComplete"
                }
                key={item.id}
                onDoubleClick={() => handleDoubleClick(item)}
              >
                <div className="todo-item">
                  <input
                    type="checkbox"
                    className="check-box"
                    checked={item.isComplete}
                    onChange={() => handleCheck(index)}
                  />
                  <li>{item.title}</li>
                </div>
                <button
                  id={item.id}
                  className="close-button"
                  onClick={handleClose}
                >
                  x
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div className="footer-box">
        {`${inputText.length - count} ${
          inputText.length - count === 1 ? "item" : "items"
        } left`}
        <div>
          <button
            className="footer-all-active-complete-button"
            onClick={handelAll}
          >
            All
          </button>
          <button
            className="footer-all-active-complete-button"
            onClick={handelActive}
          >
            Active
          </button>
          <button
            className="footer-all-active-complete-button"
            onClick={handelComplete}
          >
            Completed
          </button>
        </div>
        {!!count && (
          <button className="clear-button" onClick={handleDelete}>
            Clear complete {count}
          </button>
        )}
      </div>
    </div>
  );
};
export default TodoInput;
