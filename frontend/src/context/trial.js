
import React, { useState, useContext } from "react";
import { login } from "./login";
import { UserContext } from "./UserContext";

const Trial = () => {
    const {user, setUser} = useContext(UserContext);
  
    return (
      <div>
          <h2>Trial</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          {user ? (
              <button onClick={() => {
                  // call logout
                  setUser(null);
              }}>
                  logout
                  </button>
          ) : (<button onClick={ async () => {
              const user = await login()
              setUser(user);
          }} >
              Login
          </button>
          )}
      </div>
    );
  };
  
  export default Trial;
