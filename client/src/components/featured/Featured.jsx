import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=Mumbai,Delhi,Ahmedabad"
  );
   console.log(data) // output query result -> #cities in mumbai, delhi and ahmedabad(this will be sent to the front-end -> cities mentioned below search bar)
  return (
    <div className="featured">
      {loading ? (
        "Loading Please Wait..."
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://media.istockphoto.com/photos/the-bandraworli-sea-link-mumbai-india-picture-id860528756?k=20&m=860528756&s=612x612&w=0&h=5uau9cXU4jVjW7b9YejARZcRyubZLkMpbIO8HTD93Oc="
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Mumbai</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaGl8ZW58MHx8MHx8&w=1000&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Delhi</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1638006524490-492fdf36ee04?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Ahmedabad</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
