import "../output.css";
import {Exit} from "../../wailsjs/go/main/App";
import {Minimize} from "../../wailsjs/go/main/App";
import SearchBar from "./SearchBar";
import React  from "react";
interface searchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function Header({searchQuery, setSearchQuery}: searchBarProps) {
  function exit() {
    Exit();
  }
  function minimize() {
    Minimize();
  }

  return (
    <>

      <div className="flex justify-end space-x-2 my-2">
{/*        minimize btn */}
        <button onClick={minimize}>
          <svg
            className="w-4 h-4"
            fill="#000000"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
            enableBackground="new 0 0 52 52"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path d="M50,48.5c0,0.8-0.7,1.5-1.5,1.5h-45C2.7,50,2,49.3,2,48.5v-3C2,44.7,2.7,44,3.5,44h45 c0.8,0,1.5,0.7,1.5,1.5V48.5z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
        </button>
        <button onClick={exit}>
{/*          exit btn */}
          <svg
            className="w-4 h-4"
            viewBox="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <title>
                action / 9 - action, cancel, close, delete, exit, remove, x icon
              </title>{" "}
              <g
                id="Free-Icons"
                stroke="none"
                strokeWidth="1"
                fill="none"
                fillRule="evenodd"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <g
                  transform="translate(-157.000000, -158.000000)"
                  id="Group"
                  stroke="#000000"
                  strokeWidth="2"
                >
                  {" "}
                  <g transform="translate(153.000000, 154.000000)" id="Shape">
                    {" "}
                    <path d="M19,5 L5,19 M19,19 L5,5"> </path>{" "}
                  </g>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </svg>
        </button>
      </div>
      <div className="flex">
        <div className="flex-none">
          <div className="flex flex-row">
            <h3 className="text-3xl font-bold">Service</h3>
            <h3 className="text-3xl font-bold text-primary-purple">.UI</h3>
          </div>
        </div>
        <div className="grow"></div>
        {/* <!-- search bar --> */}
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
      <hr className="text-deep-gray my-5 mr-8 shadow shadow-deep-gray" />
    </>
  );
}
export default Header