import React, {useState,useEffect } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import "./Review.css";
import Card from "../CreateExperience/Card/Card";
import { Navbar } from "../LandingPage/Navbar/Navbar";
import { Footer } from "../LandingPage/Footer/Footer";
import { NavLink } from "react-router-dom";
import Map from "../Map/Map";
import Ratings from "./Ratings";
import axios from "axios";
import Comment from "../Comment/Comment";

const Review = () => {


  const [data, setData] = useState(JSON.parse(localStorage.getItem("userexperience")));
  const [comments, setComments] = useState([])
  useEffect(()=>{
    const func=()=>{
      setData(JSON.parse(localStorage.getItem("userexperience")));
    }
    func();
},[data])

  useEffect(()=>{
    const func = ()=>{
      let dest_id = data._id
      axios.post("http://localhost:8000/api/dest/destination/getcomments", {
        dest_id : dest_id
      })
      .then((res)=>{
        // console.log(res.data)
        setComments(res.data.comments)
      }).catch((err)=>{
        console.log("Error retrieving comments", err)
      }) 
    }
    func();
  }, [comments])
  
  return (
    <>
      <Navbar />
      <Map geometry={data.geometry} title={data.title}/>
      <div style={{ marginTop: "0px", marginBottom: "70px" }}>
        <Card className="px-1">
          <div className="review">
            <div className="reviewHeading">
              <div>
                <div>
                  <span
                    style={{
                      fontSize: "40px",
                      fontWeight: "500",
                      letterSpacing: "1px",
                      wordSpacing: "5px",
                      color: "#00478f",
                      
                    }}
                    
                  >
                    {" "}
                    {/* Taj Mahal Experience */}
                    {data.title} <span style={{fontSize: "20px"}}>&nbsp; Avg Rating: {data.avgRating}</span>
                  </span>
                </div>

                <div style={{ textAlign: "end" }}>
                  <span style={{ fontSize: "18px" }} >
                    author:
                  </span>{" "}
                  <span
                    style={{
                      fontSize: "20px",
                      fontStyle: "italic",
                      fontFamily: "cursive",

                    }}
                  >
                    {/* Cole{" "} */}
                    <NavLink
                      to={{ pathname: "/Userprofile", data: data.author }}
                      // target="_blank" rel="noopener noreferrer"
                      style={{  textDecoration:"none",color:"gray"}}
                      className="onhoveringusername"
                    >
                      {data.username}
                    </NavLink>
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "80%",
                marginLeft: "10%",
                display: "flex",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              {/* <span  style={{fontSize:"35px",fontWeight:"500"}}>Gallery Images</span> */}
            </div>

            {/* Images--------------------------------------- */}

            <ImageGallery data={data.images} />

            <div
              className="reviewdescription mx-5"
              style={{
                display: "flex",

                flexDirection: "column",
                marginTop:"40px"
              }}
            >
              <div>
          <span style={{ fontSize:"30px",fontWeight:"500", fontFamily: "sans-serif",
         }}>
            Description
          </span>
        </div>

              <div className="mx-4 my-3">
                <span style={{ fontSize: "19px" }}>
                  {data.description}
                </span>
              </div>
            </div>
          </div>
        </Card>
        {/* Add All the comments here */}
        <Card>
          <h4 style={{
            color: "orange", 
            marginLeft: "100px", 
            marginBottom: "0px", 
            marginTop:"30px", 
            fontStyle:"Bold"}
            }>Comments</h4>
          
          {
            comments.length>0 && <div>
              { 
                comments.map((comment)=>
                  // <div>{comment.rating}&nbsp; &nbsp;{comment.comment}</div>
                  // <div>{comment}</div>
                  <Comment comment={comment}></Comment>
                )
              }
            </div>
          }
          {comments.length===0 && <div style={{
              color: "blue", 
              marginLeft: "100px", 
              marginBottom: "0px", 
              marginTop:"30px", 
              fontStyle:"Bold"}}
          >be the first one to comment</div>
          }
        </Card>
        <div>
          <div className="mb-5" style={{marginTop:"80px"}}>
            <Ratings dest_id = {data._id} author = {data.author} />
          </div>
        </div>
      </div>
      <div style={{ position: "relative", marginTop: "200px" }}>
        <Footer />
      </div>
    </>
  );
};

export default Review;
