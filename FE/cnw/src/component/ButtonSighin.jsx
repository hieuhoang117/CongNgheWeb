import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
const ButtonSignin = () => {
  return (
    <div>
      <Button type="primary" style={{ backgroundColor: 'red', borderColor: 'red' }}
      icon={<ArrowRightOutlined />}
      iconPlacement="end">Đăng nhập</Button>
    </div>
  );
};

export default ButtonSignin;