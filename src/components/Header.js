import React from "react";
import TodoInput from "./TodoInput";

const Header = () => {
    return (
        <div>
            <h1 className="heading">todos</h1>
            <TodoInput />
        </div>
    );
};

export default Header;
