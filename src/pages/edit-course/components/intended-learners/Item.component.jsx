import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";

const Item = ({
  order,
  onChangeItem,
  defaultValue = "",
  id = null,
  onRemoveItem = null,
  allowRemoveItem,
  innerRef = null,
  placeholder,
}) => {
  const [display, setDisplay] = useState(true);
  const [displayActionButton, setDisplayActionButton] = useState(false);

  const hideItem = () => {
    setDisplay(false);
  };

  useEffect(() => {
    defaultValue && setDisplayActionButton(true);
  }, []);

  return (
    display && (
      <Col span={24}>
        <Row gutter={10}>
          <Col span={20}>
            {/* <span>order: {order}</span> */}
            <Input
              ref={innerRef}
              id={id}
              data-order={order}
              name={`item_${order}`}
              onChange={(e) => {
                e.target.value.trim() !== ""
                  ? setDisplayActionButton(true)
                  : setDisplayActionButton(false);
                onChangeItem(e);
              }}
              showCount
              maxLength={160}
              placeholder={placeholder}
              defaultValue={defaultValue}
            />
          </Col>
          {displayActionButton && (
            <Col span={4}>
              <Button
                onClick={() => {
                  if (allowRemoveItem) {
                    hideItem();
                    onRemoveItem(order);
                  }
                }}
                className="btn-remove h-100 d-flex align-items-center"
                disabled={allowRemoveItem ? false : true}
              >
                <ImBin />
              </Button>
            </Col>
          )}
        </Row>
      </Col>
    )
  );
};

export default Item;
