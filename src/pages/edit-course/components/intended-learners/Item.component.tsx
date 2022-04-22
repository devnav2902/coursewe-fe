import { Button, Col, Input, Row } from "antd";
import { FC, LegacyRef, useEffect, useState } from "react";
import { ImBin } from "react-icons/im";
import { EventInput } from "./OutcomeContainer.component";

interface ItemProps {
  order: number;
  placeholder: string;
  allowRemoveItem: boolean;
  defaultValue: string;
  onChangeItem: (e: EventInput) => void;
  innerRef: LegacyRef<Input>;
  onRemoveItem: () => void;
}

const Item: FC<ItemProps> = ({
  order,
  onChangeItem,
  defaultValue = "",
  onRemoveItem,
  allowRemoveItem,
  innerRef,
  placeholder,
}: ItemProps): JSX.Element | null => {
  const [display, setDisplay] = useState(true);
  const [displayActionButton, setDisplayActionButton] = useState(false);

  const hideItem = () => {
    setDisplay(false);
  };

  useEffect(() => {
    defaultValue && setDisplayActionButton(true);
  }, []);

  return !display ? null : (
    <Col span={24}>
      <Row gutter={10}>
        <Col span={20}>
          <Input
            ref={innerRef}
            data-order={order}
            name={`item_${order}`}
            onChange={(e: EventInput) => {
              const { value } = e.target;
              value.trim() !== ""
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
                  onRemoveItem();
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
  );
};

export default Item;
