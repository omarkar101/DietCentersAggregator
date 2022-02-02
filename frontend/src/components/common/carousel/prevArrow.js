import React from "react";

const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div className={className}
        style={{ ...style, borderRadius: "50%", display: "flex", justifyContent: "center", alingItams: "center", padding: "4px"}}
        onClick={onClick}
        >
        </div>
    );
}

export default PrevArrow;