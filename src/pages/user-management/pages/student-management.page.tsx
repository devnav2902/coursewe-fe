import { Avatar, Button, Card, Modal, Row, Select, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import UserManagementApi, {
  IUser,
  UserManagementResponse,
} from "api/user-managrment.api";
import moment from "moment";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

const { Meta } = Card;

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

const UserManagementPage: FC = () => {
  const [teamData, setTeamData] = useState<{
    loaded: boolean;
    data: UserManagementResponse["items"] | null;
  }>({ loaded: false, data: null });
  const [visibleEdit, setVisibleEdit] = useState(false);

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

  return (
    <div>
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
