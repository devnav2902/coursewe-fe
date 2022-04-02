import { Button, Col, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { ImBin } from "react-icons/im";

const OutcomeItem = ({
  order,
  onChangeOutcome,
  defaultValue = "",
  id = null,
  onRemoveOutcomeItem = null,
  allowRemoveOutcome,
  innerRef = null,
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
              name={`course_outcome_${order}`}
              onChange={(e) => {
                e.target.value.trim() !== ""
                  ? setDisplayActionButton(true)
                  : setDisplayActionButton(false);
                onChangeOutcome(e);
              }}
              showCount
              maxLength={160}
              placeholder="Ví dụ: Có kiến thức nền tảng tốt về ngôn ngữ lập trình để có thể học cao lên sau này"
              defaultValue={defaultValue}
            />
          </Col>
          {displayActionButton && (
            <Col span={4}>
              <Button
                onClick={() => {
                  if (allowRemoveOutcome) {
                    hideItem();
                    onRemoveOutcomeItem(order);
                  }
                }}
                className="btn-remove h-100 d-flex align-items-center"
                disabled={allowRemoveOutcome ? false : true}
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

export default OutcomeItem;
