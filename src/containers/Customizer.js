import React, {Component} from "react";
import {Button, Drawer, Form, Radio} from "antd";
import {connect} from "react-redux";
import Auxiliary from "util/Auxiliary";
import CustomScrollbars from "util/CustomScrollbars";
import {
  onHorizontalNavPositionChange,
  onNavStyleChange,
  onVerticalNavStyleChange,
  setLayoutTypeChange,
  setThemeColorSelection,
  setThemeType
} from "appRedux/actions/Setting";
import {
  ABOVE_THE_HEADER,
  AMBER,
  BELOW_THE_HEADER,
  BLUE,
  CYAN,
  DEEP_ORANGE,
  DEEP_PURPLE,
  GREEN,
  HORIZONTAL_NAVIGATION,
  INDIGO,
  INSIDE_THE_HEADER,
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI,
  PINK,
  TAB_SIZE,
  THEME_COLOR_SELECTION_CUSTOMIZE,
  THEME_COLOR_SELECTION_PRESET,
  THEME_TYPE_DARK,
  THEME_TYPE_LITE,
  THEME_TYPE_SEMI_DARK,
  VERTICAL_NAVIGATION
} from "constants/ThemeSetting";


class Customizer extends Component {
  constructor(props) {
    super(props);
    this.state = {isCustomizerOpened: false};
  }

  toggleCustomizer = () => {
    this.setState(previousState => (
      {
        isCustomizerOpened: !previousState.isCustomizerOpened
      }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };


  onThemeTypeChange = (e) => {
    this.props.setThemeType(e.target.value);
  };
  onColorSelectionTypeChange = (e) => {
    this.props.setThemeColorSelection(e.target.value);
  };
  onNavStyleChange = (e) => {
    this.props.onNavStyleChange(e.target.value);
  };
  onVerticalNavStyleChange = (e) => {
    this.props.onVerticalNavStyleChange(e.target.value);
  };
  onHorizontalNavPositionChange = (e) => {
    this.props.onHorizontalNavPositionChange(e.target.value);
  };


  onLayoutTypeChange = (e) => {
    this.props.setLayoutTypeChange(e.target.value);
  };

  getCustomizerContent = () => {
    const {themeType, width, layoutType, horizontalNavPosition, navStyle} = this.props;
    let {verticalNavStyle} = this.props;
    if (width < TAB_SIZE && verticalNavStyle === NAV_STYLE_FIXED) {
      verticalNavStyle = NAV_STYLE_DRAWER;
    }
    return <CustomScrollbars className="gx-customizer">
      <div className="gx-customizer-item">
        <h6 className="gx-mb-3 gx-text-uppercase">Theme</h6>
        <Radio.Group value={themeType} onChange={this.onThemeTypeChange}>
          <Radio.Button value={THEME_TYPE_LITE}>Lite</Radio.Button>
          <Radio.Button value={THEME_TYPE_SEMI_DARK}>Semi Dark</Radio.Button>
          {/*<Radio.Button value={THEME_TYPE_DARK}>Dark</Radio.Button>*/}
        </Radio.Group>
      </div>

      {width > TAB_SIZE ?
        <div className="gx-customizer-item">
          <h6 className="gx-mb-3 gx-text-uppercase">Nav Style</h6>

          <Radio.Group className="gx-mb-3" value={navStyle} onChange={this.onNavStyleChange}>
            <Radio value={VERTICAL_NAVIGATION}>Vertical</Radio>
            <Radio value={HORIZONTAL_NAVIGATION}>Horizontal</Radio>
          </Radio.Group>
          <div>
            {navStyle === VERTICAL_NAVIGATION ?
              <Radio.Group value={verticalNavStyle} onChange={this.onVerticalNavStyleChange}>
                <Radio.Button disabled={width < TAB_SIZE} value={NAV_STYLE_FIXED}>Fixed</Radio.Button>
                <Radio.Button value={NAV_STYLE_DRAWER}>Drawer</Radio.Button>
                <Radio.Button disabled={width < TAB_SIZE} value={NAV_STYLE_MINI}>Mini</Radio.Button>
              </Radio.Group>
              :
              <Radio.Group value={horizontalNavPosition} onChange={this.onHorizontalNavPositionChange}>
                <Radio.Button value={INSIDE_THE_HEADER}>Inside</Radio.Button>
                <Radio.Button value={ABOVE_THE_HEADER}>Top</Radio.Button>
                <Radio.Button value={BELOW_THE_HEADER}>Below</Radio.Button>
              </Radio.Group>
            }</div>

        </div> : null
      }
      {width > TAB_SIZE ?
        <div className="gx-customizer-item">
          <h6 className="gx-mb-3 gx-text-uppercase">Layout</h6>
          <Radio.Group value={layoutType} onChange={this.onLayoutTypeChange}>
            <Radio.Button value={LAYOUT_TYPE_FULL}>Full</Radio.Button>
            <Radio.Button value={LAYOUT_TYPE_BOXED}>Boxed</Radio.Button>
            <Radio.Button value={LAYOUT_TYPE_FRAMED}>Framed</Radio.Button>
          </Radio.Group>
        </div> : null}
    </CustomScrollbars>
  };

  render() {

    return (
      <Auxiliary>
        <Drawer
          placement="right"
          closable={true}
          onClose={this.toggleCustomizer}
          visible={this.state.isCustomizerOpened}>
          {
            this.getCustomizerContent()
          }
        </Drawer>
        <div className="gx-customizer-option">
          <Button type="primary" onClick={this.toggleCustomizer.bind(this)}>
            <i className="icon icon-setting gx-p-2"/>
          </Button>
        </div>
      </Auxiliary>
    );
  }
}

Customizer = Form.create()(Customizer);

const mapStateToProps = ({settings}) => {
  const {themeType, width, navStyle, horizontalNavPosition, verticalNavStyle, layoutType} = settings;
  return {themeType, width, navStyle, horizontalNavPosition, verticalNavStyle, layoutType}
};
export default connect(mapStateToProps, {
  setThemeType,
  setLayoutTypeChange,
  onVerticalNavStyleChange,
  onHorizontalNavPositionChange,
  onNavStyleChange
})(Customizer);
