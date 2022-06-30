import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";   // icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // font-awesome svg core react libary for icons
import "./header.css";
import { DateRange } from "react-date-range"; // for date selection in header section
import { useContext, useState } from "react";
// below 2 css files must include for date widget
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";  // for formating the date output(additional library for react-date-range)
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);  // useState for opening and closing date widget on click(and by default keeping date widget close(false))
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);  // useState for opening and closing #persons and gender selection widget on click(and by default keeping persons widget close(false))
  const [options, setOptions] = useState({    // useState for setting genders and #persons after above widget opens(and by default keeping genders as below)
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // logic for increasing(i) or decreasing(d) counter of adult,childeren, rooms
  // name = any of adult,childeren, rooms
  // prev = previous state of adult,children and rooms combination
  // option is a property/object containing adult, children and rooms and setOptions is function to manipulate them(see above useState for it)
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div className="header">
      {/* set class = headerContainer listMode in case if header is called from hotels page(list) -> to target in css to remove extra margin. since not showing search and discount sections */}
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div className="headerListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Taxis</span>
          </div>
        </div>
        {/* {<>Render</>} -> react fragements -> everything between them will be rendered */}
        {/* don't show search and discount section on list(hotels) page  */}
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              A lifetime of discounts? It's Genius.
            </h1>
            <p className="headerDesc">
              Get rewarded for your travels – unlock instant savings of 10% or
              more with a free MyBooking account
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                {/* on click setOpenDate(!openDate) is used to open and close date widget on click*/}
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "dd/MM/yyyy")} to ${format(
                  dates[0].endDate,
                  "dd/MM/yyyy"
                )}`}</span>
                {/* openDate is used to by default -> don't launch the dropdown date widget without click(using react useState) see in above span tag */}
                {/* DateRange is configuration of dates */}
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                {/* on click setOpenOptions(!openOptions) is used to open and close #persons widget on click*/}
                {/* display number of adult, childs and rooms in span tage */}
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} Adult(s) · ${options.children} Children(s) · ${options.room} Room(s)`}</span>
                {/* openOptions is used to by default -> don't launch the dropdown persons widget without click(using react useState) see in above span tag */}
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult(s)</span>
                      <div className="optionCounter">
                        {/* disable -(minus) button when adult becomes <2 becoz we want atleast one adult for alloting room in out hotel  -> hotel policy */}
                        {/* for -(minus) button -> decreasing(d) and for +(plus) button increasing(i) */}
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children(s)</span>
                      <div className="optionCounter">
                        {/* disable -(minus) button when childs becomes 0 or less becoz can't have -ve childs */}
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room(s)</span>
                      <div className="optionCounter">
                        {/* disable -(minus) button when rooms<2 becoz booking is allowed for atleast one room */}
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
