import React from 'react';
import { Select as SelectAntd } from 'antd';
const Select = ({ options, defaultValue, ...props }) => {
	const { Option } = SelectAntd;
	return (
		<SelectAntd {...props} defaultValue={defaultValue && defaultValue}>
			{options?.map((item) => {
				return (
					<Option key={item?.key} value={item?.value}>
						{item?.name}
					</Option>
				);
			})}
		</SelectAntd>
	);
};

export default Select;
