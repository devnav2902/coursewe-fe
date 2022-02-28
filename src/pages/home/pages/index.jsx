import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../redux/actions/user.actions";
import { Card, Col, Row, Spin } from "antd";
import axios from "axios";
import { getAllCourses } from "../../../redux/actions/course.actions";
const Home = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log(state);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const { Meta } = Card;

  return <div style={{ padding: "20px" }}>HOME</div>;
};

export default Home;
