import { Avatar, Button, Card, Modal, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import UserManagementApi, {
  IInstructor,
  IUser,
  UserManagementResponse,
} from "../../../api/user-managrment.api";

const { Meta } = Card;
const { Option } = Select;

const StyledTable = styled.div`
  box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
    rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 20px;
  background-color: #fff;

  table {
    td {
      vertical-align: top;
    }
  }
`;

const StyledChart = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 30px;

  .apexcharts-tooltip-text-y-label,
  .apexcharts-tooltip-marker {
    display: none;
  }

  box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
    rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  border-radius: 16px;
`;

const UserManagementPage: FC = () => {
  const [teamData, setTeamData] = useState<{
    loaded: boolean;
    data: UserManagementResponse["items"] | null;
  }>({ loaded: false, data: null });
  const [visibleEdit, setVisibleEdit] = useState(false);
  // const [visibleCreate, setVisibleCreate] = useState(false);
  // const [categories, setCategories] = useState<{
  //   loaded: boolean;
  //   items: CategoriesListResponse["items"];
  // }>({ loaded: false, items: [] });
  // const [saving, setSaving] = useState(false);
  // const [statisticData, setStatisticData] = useState<{
  //   loaded: boolean;
  //   data: StatisticResponse["data"];
  // }>({
  //   loaded: false,
  //   data: [],
  // });

  const getTeam = useCallback(() => {
    UserManagementApi.userManagement()
      .then(({ data }) => {
        console.log(data.items.data);

        setTeamData({ loaded: true, data: data.items });
      })
      .catch((_) => {
        setTeamData({ loaded: true, data: null });
      });
  }, []);

  useEffect(getTeam, [getTeam]);

  // useEffect(function getCategoriesList() {
  //   CategoriesApi.getList().then(({ data }) => {
  //     setCategories({ loaded: true, items: data.items });
  //   });
  // }, []);

  // useEffect(function getStatistic() {
  //   QualityReviewTeamApi.statistic()
  //     .then(({ data }) => {
  //       setStatisticData({ loaded: true, data: data.data });
  //     })
  //     .catch((_) => {
  //       setStatisticData({ loaded: true, data: [] });
  //     });
  // }, []);

  function showModalEdit() {
    setVisibleEdit(true);
  }

  function handleOkEdit(e: React.MouseEvent<HTMLElement>) {
    setVisibleEdit(false);
  }

  function handleCancelEdit(e: React.MouseEvent<HTMLElement>) {
    setVisibleEdit(false);
  }

  const columns: ColumnsType<IUser> = useMemo(
    () => [
      {
        title: "Họ tên",
        dataIndex: "fullname",
        key: "fullname",
        width: 250,
        render: (value, record) => {
          return (
            <div>
              <Meta avatar={<Avatar src={record.avatar} />} title={value} />
            </div>
          );
        },
      },
      {
        title: "Email",
        key: "email",
        dataIndex: "email",
        width: 200,
        render: (value) => {
          return <div>{value}</div>;
        },
      },
      {
        title: "Số khóa học đã mua",
        key: "course_bill_count",
        dataIndex: "course_bill_count",
        width: 200,
        render: (value) => {
          return <div>{value} khóa học</div>;
        },
      },

      {
        title: "Ngày tạo",
        key: "created_at",
        dataIndex: "created_at",
        width: 200,
        render: (value) => {
          return <div>{moment(value).fromNow()}</div>;
        },
      },

      {
        key: "action",
        render: (value) => {
          return (
            <div>
              <Button type="link">Chi tiết</Button>
              <Button type="link" onClick={showModalEdit}>
                Chỉnh sửa
              </Button>
            </div>
          );
        },
      },
    ],
    []
  );

  // const titleCategories = useMemo(
  //   () => statisticData.data.map((item) => item.title),
  //   [statisticData.data]
  // );

  // const dataStatistic = useMemo(() => {
  //   return [
  //     {
  //       name: undefined,
  //       data: statisticData.data.map((item) => {
  //         let arrayUser: {
  //           category_id: number;
  //           user_id: number;
  //         }[] = [];

  //         item.data.forEach((value) => {
  //           arrayUser = arrayUser.concat(value.people);
  //         });

  //         return _.uniqBy(arrayUser, "user_id").length;
  //       }),
  //     },
  //   ];
  // }, [statisticData.data]);

  return (
    <div>
      {/* <StyledChart>
        <Title level={3}>Thống kê đội ngũ chuyên môn</Title>

        <Chart
          options={{
            chart: {
              type: "bar",
              height: 600,
              stacked: true,
            },
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            dataLabels: {
              formatter: (val) => {
                return val.toString();
              },
            },
            stroke: {
              width: 1,
              colors: ["#fff"],
            },
            title: {
              text: undefined,
              style: { fontFamily: "var(--font)" },
            },
            xaxis: {
              categories: titleCategories,
              labels: {
                formatter: function (val) {
                  return val + " Thành viên";
                },
              },
            },
            yaxis: {
              title: {
                text: undefined,
              },
            },
            tooltip: {
              y: {
                formatter: function (val, opts) {
                  const data = statisticData.data;

                  let list = "";

                  data[opts.dataPointIndex].data.forEach((item) => {
                    list += `<div><span>${item.title}</span>: ${item.numberOfPeople} Thành viên</div>`;
                  });

                  return list;
                },
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: "top",
              horizontalAlign: "left",
              offsetX: 40,
            },
          }}
          series={dataStatistic}
          type="bar"
          height={320}
        />
      </StyledChart> */}

      <StyledTable>
        <Row align="middle" justify="space-between" className="mb-3">
          <Title level={3}>Danh sách học viên</Title>
        </Row>
        <Table
          loading={!teamData.loaded}
          columns={columns}
          dataSource={teamData.data?.data}
          bordered
        />
      </StyledTable>

      <Modal
        title="Chỉnh sửa"
        visible={visibleEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        okButtonProps={{ disabled: true }}
        cancelButtonProps={{ disabled: true }}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
