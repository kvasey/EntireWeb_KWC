import React, { Component } from 'react';

import { Platform, View, Text, Picker } from 'react-native';
import PickerIOS from './PickerIOS';

export default class extends Component {
	state = {
		changed: false
	};

	valueChange(value, index) {
		if (value !== -1) {
			this.setState({ changed: true });
			this.props.onSubmit(value, index);
		}
	}

	render() {
		const { options, pickerIndex, activeIndex, style, textStyle, iconStyle, useId } = this.props;

		const selected = useId
			? options.find(({ id }) => parseInt(id) === parseInt(activeIndex)) || options[0]
			: options[activeIndex || 0];
		return Platform.OS === 'android' ? null : (
			<PickerIOS
				onSubmit={value => this.valueChange(value, pickerIndex)}
				currentName={selected.name}
				selectedValue={this.props.hide ? (this.state.changed ? selected : -1) : selected}
				activeIndex={activeIndex}
				options={options}
				style={style}
				useId={useId}
				textStyle={textStyle}
				iconStyle={iconStyle}
			/>
		);
	}
}
