import * as React from "react";
import {
  TextStyle,
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  ViewStyle,
  StyleProp,
  ImageStyle
} from "react-native";
import Color from "../res/Color";
//                       import { getComponentLocale } from "../utlis/GetLocale";

function noop() {}

export interface SearchBarPropsType {
  defaultValue?: string; // 搜索框的默认值
  value?: string; //搜索框的当前值
  placeholder?: string;
  onSubmit?: (value: string) => void; // submit 事件(点击键盘的enter)
  onChange?: (value: string) => void; // change 事件的回调
  onFocus?: () => void; // focus 事件的回调
  onBlur?: () => void; // blur 事件回调
  onCancel?: (value: string) => void; // 点击 取消 按钮触发(不再自动清除输入框的文字)
  showCancelButton?: boolean; // 是否一直显示 取消按钮
  cancelText?: string; //定制 取消 按钮的文字
  disabled?: boolean; // 设置禁用
  styles?: any;
  autoFocus?: boolean;
  focused?: boolean;
  onClear?: (value: string) => void;
  maxLength?: number;
}

export interface ISearchBarStyle {
  input: TextStyle;
  inputWrapper: ViewStyle;
  wrapper: ViewStyle;
  cancelTextContainer: ViewStyle;
  cancelText: TextStyle;
  search: ImageStyle;
}

export interface SearchBarState {
  value?: string; // 输入的值
  focus?: boolean; // 焦点
  focused?: boolean; // 是否获取焦点？
}

export const defaultProps = {
  prefixCls: "am-search",
  placeholder: "",
  onSubmit: noop,
  onChange: noop,
  onFocus: noop,
  onBlur: noop,
  onClear: noop,
  showCancelButton: false,
  disabled: false
};
export interface SearchBarNativeProps extends SearchBarPropsType {
  styles?: ISearchBarStyle; //seachBar内部各自的组件
  onChangeText?: (text: string) => void; // 输入文本改变回调事件
  onSubmitEditing?: (event: { nativeEvent: { text: string } }) => void;
  style?: StyleProp<TextStyle>;
}

export const SearchBarStyles = StyleSheet.create<any>({
  inputWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  input: {
    borderRadius: Color.radius_md,
    backgroundColor: "#fff",
    borderColor: Color.border_color_base,
    borderWidth: Color.border_width_sm,
    height: Color.search_bar_input_height,
    color: Color.color_text_base,
    fontSize: Color.font_size_base,
    paddingLeft: Color.h_spacing_lg + Color.icon_size_xxs + Color.h_spacing_sm,
    paddingRight: Color.h_spacing_lg + Color.icon_size_xxs + Color.h_spacing_sm,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0
  },
  wrapper: {
    backgroundColor: Color.search_bar_fill,
    height: Color.search_bar_height,
    paddingLeft: Color.h_spacing_md,
    paddingRight: Color.h_spacing_md,
    flexDirection: "row",
    alignItems: "center"
  },
  cancelTextContainer: {
    height: Color.search_bar_input_height,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelText: {
    fontSize: Color.link_button_font_size,
    color: Color.color_link,
    paddingLeft: Color.h_spacing_lg
  },
  search: {
    tintColor: Color.input_color_icon,
    position: "absolute",
    left: Color.h_spacing_md + 8,
    top: (Color.search_bar_height - Color.icon_size_xxs) / 2,
    width: Color.icon_size_xxs,
    height: Color.icon_size_xxs
  }
});

export default class SearchBar extends React.Component<
  SearchBarNativeProps,
  SearchBarState
> {
  static defaultProps = {
    ...defaultProps,
    styles: SearchBarStyles
  };

  static contextTypes = {
    antLocale: Object
  };

  inputRef: TextInput | null = null;

  constructor(props: SearchBarNativeProps) {
    super(props);
    let value;
    if ("value" in props) {
      value = props.value;
    } else if ("defaultValue" in props) {
      value = props.defaultValue;
    } else {
      value = "";
    }
    this.state = {
      value,
      focus: false
    };
  }

  componentWillReceiveProps(nextProps: SearchBarNativeProps) {
    if ("value" in nextProps) {
      //如果props 中包含value 属性 则渲染UI
      this.setState({
        value: nextProps.value
      });
    }
  }

  onSubmit = (a: { nativeEvent: { text: string } }) => {
    this.setState({ value:a.nativeEvent.text })
    console.log("submit",this.props.onSubmit)
    if (this.props.onSubmit) {
      // if 语句 null == false
      this.props.onSubmit(a.nativeEvent.text || ""); // 用|| 与 && 来取代三元运算符
    }
  };

  onChangeText = (value: string) => {
    if (!("value" in this.props)) {
      this.setState({ value });
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  onCancel = () => {
    if (this.props.onCancel) {
      this.props.onCancel(this.state.value || "");
    }
  };

  onFocus = () => {
    this.setState({
      focus: true
    });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  onBlur = () => {
    this.setState({
      focus: false
    });
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };
  render() {
     const {
      showCancelButton,
      styles ,
      value: propsValue,
      cancelText,
      onChangeText,
      onChange,
      onSubmitEditing,
      disabled,
      ...restProps
    } = this.props;
    
    // tslint:disable-next-line:variable-name
   // const _locale = getComponentLocale(this.props, this.context, "SearchBar");

   const { style } = restProps;
    const { value, focus } = this.state;
    // tslint:disable-next-line:variable-name
    const _showCancelButton = showCancelButton || focus; 

    return (
      <View style={styles.wrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={value}
            onChangeText={this.onChangeText}
            style={[styles.input, style]}
            editable={!disabled}
            ref={el => ((this.inputRef as any) = el)}
            onSubmitEditing={this.onSubmit}
            clearButtonMode="always"
            underlineColorAndroid="transparent"
            {...restProps}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
        </View>
        <Image
          source={require("../res/img/search.png")}
          style={styles.search}
          resizeMode="stretch"
        />
        {_showCancelButton && (
          <View style={styles.cancelTextContainer}>
            <Text style={styles.cancelText} onPress={this.onCancel}>
              {cancelText }
            </Text>
          </View>
        )}
      </View> 
    );
  }
}
