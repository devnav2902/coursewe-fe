import {
  CheckCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Avatar,
  Button,
  Card,
  Col,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import CategoriesApi, {
  CategoriesListResponse,
} from "../../../api/categories.api";
import QualityReviewTeamApi, {
  GetQualityReviewTeamResponse,
  IQualityReviewTeam,
  StatisticResponse,
} from "../../../api/quality-review-team.api";
import { openNotification } from "../../../utils/functions";
import Chart from "react-apexcharts";
import _ from "lodash";

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

const QualityReviewPage: FC = () => {
  const [teamData, setTeamData] = useState<{
    loaded: boolean;
    data: GetQualityReviewTeamResponse["items"] | null;
  }>({ loaded: false, data: null });
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [categories, setCategories] = useState<{
    loaded: boolean;
    items: CategoriesListResponse["items"];
  }>({ loaded: false, items: [] });
  const [saving, setSaving] = useState(false);
  const [statisticData, setStatisticData] = useState<{
    loaded: boolean;
    data: StatisticResponse["data"];
  }>({
    loaded: false,
    data: [],
  });

  const [nation, setNation] = useState([]);

  const formCreateUserHandler = useForm({
    defaultValues: { fullname: "", categories: [], email: "", nation: "" },
  });

  const getTeam = useCallback(() => {
    QualityReviewTeamApi.get()
      .then(({ data }) => {
        console.log(data.items.data);

        setTeamData({ loaded: true, data: data.items });
      })
      .catch((_) => {
        setTeamData({ loaded: true, data: null });
      });
  }, []);

  useEffect(getTeam, [getTeam]);

  useEffect(function getCategoriesList() {
    CategoriesApi.getList().then(({ data }) => {
      setCategories({ loaded: true, items: data.items });
    });
  }, []);

  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((res) => res.json())
      .then((data) => {
        setNation(data);
      });
  }, []);

  useEffect(function getStatistic() {
    QualityReviewTeamApi.statistic()
      .then(({ data }) => {
        setStatisticData({ loaded: true, data: data.data });
      })
      .catch((_) => {
        setStatisticData({ loaded: true, data: [] });
      });
  }, []);

  function showModalEdit() {
    setVisibleEdit(true);
  }

  function handleOkEdit(e: React.MouseEvent<HTMLElement>) {
    setVisibleEdit(false);
  }

  function handleCancelEdit(e: React.MouseEvent<HTMLElement>) {
    setVisibleEdit(false);
  }

  function showCreateNew() {
    setVisibleCreate(true);
  }

  function handleOkCreate(e: React.MouseEvent<HTMLElement>) {
    formCreateUserHandler.handleSubmit((data) => {
      setSaving(true);

      QualityReviewTeamApi.create(data)
        .then((_) => {
          setSaving(false);
          getTeam();
          openNotification("success", "Thêm dữ liệu thành công!");
          setVisibleCreate(false);
        })
        .catch((_) => {
          setSaving(false);
          openNotification("error", "Thêm dữ liệu không thành công!");
          setVisibleCreate(false);
        });
    })();
  }

  function handleCancelCreate(e: React.MouseEvent<HTMLElement>) {
    setVisibleCreate(false);
  }

  const columns: ColumnsType<IQualityReviewTeam> = useMemo(
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
        title: "Trạng thái",
        key: "account_status",
        dataIndex: "account_status",
        width: 100,
        render: (value, record) => {
          const isQuitJob = value !== "1";
          const color = isQuitJob ? "error" : "blue";

          return (
            <div>
              <Tag
                icon={
                  isQuitJob ? <MinusCircleOutlined /> : <CheckCircleOutlined />
                }
                color={color}
                key={value}
              >
                {isQuitJob ? "Thôi việc" : "Làm việc"}
              </Tag>
            </div>
          );
        },
      },
      {
        title: "Chuyên môn",
        key: "quality_review_team",
        dataIndex: "quality_review_team",
        width: 300,
        render: (value: IQualityReviewTeam["quality_review_team"][]) => {
          const speciality = value.map((item) => item.category.title);

          return (
            <div>
              {speciality.map((item, i) => (
                <Tag key={i} style={{ marginBottom: 4 }}>
                  {item}
                </Tag>
              ))}
            </div>
          );
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

  const titleCategories = useMemo(
    () => statisticData.data.map((item) => item.title),
    [statisticData.data]
  );

  const dataStatistic = useMemo(() => {
    return [
      {
        name: undefined,
        data: statisticData.data.map((item) => {
          let arrayUser: {
            category_id: number;
            user_id: number;
          }[] = [];

          item.data.forEach((value) => {
            arrayUser = arrayUser.concat(value.people);
          });

          return _.uniqBy(arrayUser, "user_id").length;
        }),
      },
    ];
  }, [statisticData.data]);

  return (
    <div>
      <StyledChart>
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
      </StyledChart>

      <StyledTable>
        <Row align="middle" justify="space-between" className="mb-3">
          <Title level={3}>Danh sách đội ngũ chuyên môn</Title>
          <div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={showCreateNew}
            >
              Thêm mới
            </Button>
          </div>
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

      <Modal
        title="Thêm mới"
        visible={visibleCreate}
        onOk={handleOkCreate}
        onCancel={handleCancelCreate}
        okButtonProps={{ disabled: saving, loading: saving }}
        cancelButtonProps={{ disabled: saving, loading: saving }}
        cancelText="Trở về"
        okText={saving ? "Đang tạo..." : "Đồng ý"}
        width={650}
      >
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Controller
              control={formCreateUserHandler.control}
              name="fullname"
              rules={{ required: "Bạn chưa nhập họ tên!" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input {...field} placeholder="Nhập họ tên" />
                  {error && (
                    <Alert
                      style={{ marginTop: 3, fontSize: 13 }}
                      message={error.message}
                      type="warning"
                      showIcon
                    />
                  )}
                </>
              )}
            />
          </Col>
          <Col span={12}>
            <Controller
              control={formCreateUserHandler.control}
              name="email"
              rules={{ required: "Bạn chưa nhập email!" }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    {...field}
                    placeholder="Nhập địa chỉ email"
                    type="email"
                  />
                  {error && (
                    <Alert
                      style={{ marginTop: 3, fontSize: 13 }}
                      message={error.message}
                      type="warning"
                      showIcon
                    />
                  )}
                </>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={formCreateUserHandler.control}
              name="categories"
              rules={{
                validate: (value) =>
                  value.length > 0 ||
                  "Chọn ít nhất một chuyên môn cho người này!",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Chọn chuyên môn"
                    optionLabelProp="label"
                    loading={!categories.loaded}
                    optionFilterProp="label"
                    {...field}
                  >
                    {categories.items.map((item) => (
                      <Option
                        key={item.category_id}
                        value={item.category_id}
                        label={item.title}
                      >
                        <div className="demo-option-label-item">
                          {item.title}
                        </div>
                      </Option>
                    ))}
                  </Select>
                  {error && (
                    <Alert
                      style={{ marginTop: 3, fontSize: 13 }}
                      message={error.message}
                      type="warning"
                      showIcon
                    />
                  )}
                </>
              )}
            />
          </Col>
          <Col span={24}>
            <Controller
              control={formCreateUserHandler.control}
              name="nation"
              rules={{
                validate: (value) =>
                  value.length > 0 ||
                  "Chọn ít nhất một chuyên môn cho người này!",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Quốc gia"
                    optionLabelProp="label"
                    optionFilterProp="label"
                    {...field}
                    showSearch
                  >
                    {nation.map((item: any, index: number) => (
                      <Option key={index} value={item.name} label={item.name}>
                        <div className="demo-option-label-item">
                          {item.name}
                        </div>
                      </Option>
                    ))}
                  </Select>
                  {error && (
                    <Alert
                      style={{ marginTop: 3, fontSize: 13 }}
                      message={error.message}
                      type="warning"
                      showIcon
                    />
                  )}
                </>
              )}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default QualityReviewPage;
