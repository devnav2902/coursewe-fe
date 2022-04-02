import { Modal } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";

function useHandleRedirect() {
  const ref = useRef();

  // const [isModalVisible, setIsModalVisible] = useState(false);

  // const modal = useMemo(
  //   () => (
  //     <Modal
  //       visible={isModalVisible}
  //       // onOk={handleOk} onCancel={handleCancel}
  //     >
  //       <p>Thay đổi chưa được lưu, bạn có muốn hủy bỏ?</p>
  //     </Modal>
  //   ),
  //   [isModalVisible]
  // );

  useEffect(() => {
    return () => {
      ref.current = { willUnmount: true, Modal: "modal" };
    };
  }, [ref]);
  return ref.current;
}

export { useHandleRedirect };
