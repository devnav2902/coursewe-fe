import { Col, Row } from "antd";
import Course from "../../../components/Course/Course.component";

const Home = () => {
  const arrCourses = [
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
  ];

  return (
    <Row gutter={[15, 15]} className="list-courses">
      {arrCourses.map((course, i) => {
        return (
          <Col span={6}>
            <Course course={course} />
          </Col>
        );
      })}
    </Row>
  );
};

export default Home;
