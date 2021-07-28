import Button from '../button/button';

const ButtonExample = () => (
  <div>
    <Button className="aaaa" type="button" onClick={() => true}>
      <span>Button</span>
    </Button>
    <Button type="button" isLoading isDisabled>
      <span>LoadingButton</span>
    </Button>
    <Button type="button" shape="circle">
      <span>Ok</span>
    </Button>
    <Button
      onClick={() => true}
      type="button"
      icon={
        (
          <img
            style={{ width: '30px' }}
            src="https://www.imgonline.com.ua/examples/bee-on-daisy.jpg"
            alt="img"
          />
        )
      }
      iconPosition="right"
    >
      <span>fff</span>
    </Button>
  </div>
);

export default ButtonExample;
