import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dot from '@iso/assets/images/dot_outline.svg';
import Menu from '@iso/components/uielements/menu';
import IntlMessages from '@iso/components/utility/intlMessages';

const SubMenu = Menu.SubMenu;

const stripTrailingSlash = (str) => {
	if (str.substr(-1) === '/') {
		return str.substr(0, str.length - 1);
	}
	return str;
};
export default React.memo(function SidebarMenu({ singleOption, submenuStyle, submenuColor, ...rest }) {
	let match = useRouteMatch();
	const roles = useSelector((state) => state.Account.roles);

	const { key, label, leftIcon, children } = singleOption;
	const url = stripTrailingSlash(match.url);

	if (children) {
		return (
			<SubMenu
				key={key}
				title={
					<span className="isoMenuHolder" style={submenuColor}>
						{singleOption.subLevel && <img className="dot" src={dot} alt="dot" />}
						{leftIcon && <i className={leftIcon} />}
						<span className="nav-text">
							<IntlMessages id={label} />
						</span>
					</span>
				}
				{...rest}
			>
				{children.map((child) => {
					const linkTo = child.withoutDashboard ? `/${child.key}` : `${url}/${child.key}`;
					if (child.role) {
						var isExist = roles.find((e) => e === child.role);
						if (isExist)
							return (
								<Menu.Item style={submenuStyle} key={child.key}>
									<img className="dot" src={dot} />
									<Link style={submenuColor} to={linkTo}>
										<IntlMessages id={child.label} />
									</Link>
								</Menu.Item>
							);
						return;
					} else {
						return (
							<Menu.Item style={submenuStyle} key={child.key}>
								<img className="dot" src={dot} />
								<Link style={submenuColor} to={linkTo}>
									<IntlMessages id={child.label} />
								</Link>
							</Menu.Item>
						);
					}
				})}
			</SubMenu>
		);
	} else {
		const linkTo = singleOption.withoutDashboard ? `/${singleOption.key}` : `${url}/${singleOption.key}`;
		return (
			<Menu.Item key={key} {...rest} id={singleOption.subOnlyChild ? 'subOnlyChild' : ''}>
				{singleOption.subLevel && <img className="dot" src={dot} />}
				<Link to={linkTo}>
					<span className="isoMenuHolder" style={submenuColor}>
						<i className={leftIcon} />
						<span className="nav-text">
							<IntlMessages id={label} />
						</span>
					</span>
				</Link>
			</Menu.Item>
		);
	}
});
