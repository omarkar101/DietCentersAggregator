import React, { useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div className='location-wrapper'>
    <div className='location-icon-name'>
      <i className='fi fi-rr-marker absolute-center location-icon'></i>
      <a
        href=''
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}>
        {children}
        &#x25bc;
      </a>
    </div>
    <i className='fi fi-rr-caret-down absolute-center'></i>
  </div>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
  const [value, setValue] = useState("");

  return (
    <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
      <FormControl
        autoFocus
        className='mx-3 my-2 w-auto'
        placeholder='Type to filter...'
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul className='list-unstyled'>
        {React.Children.toArray(children).filter(
          (child) => !value || child.props.children.toLowerCase().startsWith(value)
        )}
      </ul>
    </div>
  );
});

const PlaceDropDown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
        Beirut
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Item eventKey='1'>Red</Dropdown.Item>
        <Dropdown.Item eventKey='2'>Blue</Dropdown.Item>
        <Dropdown.Item eventKey='3' active>
          Orange
        </Dropdown.Item>
        <Dropdown.Item eventKey='1'>Red-Orange</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default PlaceDropDown;
