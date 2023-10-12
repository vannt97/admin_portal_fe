import Menu from '@iso/components/uielements/menu';
import Scrollbars from '@iso/components/utility/customScrollBar';
import Logo from '@iso/components/utility/logo';
import accountActions from '@iso/redux/account/actions';
import appActions from '@iso/redux/app/actions';
import { Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import options from './options';
import SidebarWrapper from './SidebarCustom.styles';
import SidebarMenu from './SidebarMenu';

const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
const { accountRoles } = accountActions;

const { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed } = appActions;

export default function Sidebar() {
	const dispatch = useDispatch();
	const { view, openKeys, collapsed, openDrawer, current, height } = useSelector((state) => state.App);
	const customizedTheme = useSelector((state) => state.ThemeSwitcher.sidebarTheme);
	const roles = useSelector((state) => state.Account.roles);

	useEffect(() => {
		dispatch(accountRoles());
	}, []);

	function handleClick(e) {
		dispatch(changeCurrent([e.key]));
		if (view === 'MobileView') {
			setTimeout(() => {
				dispatch(toggleCollapsed());
				// dispatch(toggleOpenDrawer());
			}, 100);

			// clearTimeout(timer);
		}
	}
	function onOpenChange(newOpenKeys) {
		const latestOpenKey = newOpenKeys.find((key) => !(openKeys.indexOf(key) > -1));
		const latestCloseKey = openKeys.find((key) => !(newOpenKeys.indexOf(key) > -1));
		let nextOpenKeys = [];
		if (latestOpenKey) {
			nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
		}
		if (latestCloseKey) {
			nextOpenKeys = getAncestorKeys(latestCloseKey);
		}
		dispatch(changeOpenKeys(nextOpenKeys));
	}
	const getAncestorKeys = (key) => {
		const map = {
			sub3: ['sub2'],
		};
		return map[key] || [];
	};

	const isCollapsed = collapsed && !openDrawer;
	const mode = isCollapsed === true ? 'vertical' : 'inline';
	const onMouseEnter = (event) => {
		if (collapsed && openDrawer === false) {
			dispatch(toggleOpenDrawer());
		}
		return;
	};
	const onMouseLeave = () => {
		if (collapsed && openDrawer === true) {
			dispatch(toggleOpenDrawer());
		}
		return;
	};
	const styling = {
		backgroundColor: customizedTheme.backgroundColor,
	};
	const submenuStyle = {
		backgroundColor: 'rgba(0,0,0,0.3)',
		color: customizedTheme.textColor,
	};
	const submenuColor = {
		color: customizedTheme.textColor,
	};

	function renderMenuItem(singleOption) {
		if (singleOption.role) {
			let isExist = roles.find((e) => e === singleOption.role);
			if (isExist)
				return (
					<SidebarMenu
						key={singleOption.key}
						submenuStyle={submenuStyle}
						submenuColor={submenuColor}
						singleOption={singleOption}
					/>
				);
			return;
		} else {
			let { isNotRole } = singleOption;
			if (isNotRole)
				return (
					<SidebarMenu
						key={singleOption.key}
						submenuStyle={submenuStyle}
						submenuColor={submenuColor}
						singleOption={singleOption}
					/>
				);

			let isExist = false;
			let { children } = singleOption;
			if (children) {
				children.every((child, i) => {
					if (roles.find((e) => e === child.role)) {
						isExist = true;
						return false;
					}
					return true;
				});
			}
			if (isExist)
				return (
					<SidebarMenu
						key={singleOption.key}
						submenuStyle={submenuStyle}
						submenuColor={submenuColor}
						singleOption={singleOption}
					/>
				);
		}
	}

	return (
		<SidebarWrapper>
			<Sider
				trigger={null}
				collapsible={true}
				collapsed={isCollapsed}
				width={220}
				className="isomorphicSidebar"
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				style={styling}
			>
				<Logo collapsed={isCollapsed} />
				<Scrollbars style={{ height: height - 70 }}>
					<Menu
						onClick={handleClick}
						theme="dark"
						className="isoDashboardMenu"
						mode={mode}
						// openKeys={isCollapsed ? [] : openKeys}
						selectedKeys={current}
						onOpenChange={onOpenChange}
					>
						{options.map((singleOption) =>
							// <SidebarMenu
							//   key={singleOption.key}
							//   submenuStyle={submenuStyle}
							//   submenuColor={submenuColor}
							//   singleOption={singleOption}
							// />
							renderMenuItem(singleOption)
						)}
					</Menu>
				</Scrollbars>
			</Sider>
		</SidebarWrapper>
	);
}
