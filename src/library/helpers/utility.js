import { message } from 'antd';
import { Map } from 'immutable';
import * as moment from 'moment';
import React from 'react';
import swal from 'sweetalert';

//#region
export function clearToken() {
	localStorage.removeItem('id_token');
}

export function getToken() {
	try {
		const idToken = localStorage.getItem('id_token');
		return new Map({ idToken });
	} catch (err) {
		clearToken();
		return new Map();
	}
}

export function timeDifference(givenTime) {
	givenTime = new Date(givenTime);
	const milliseconds = new Date().getTime() - givenTime.getTime();
	const numberEnding = (number) => {
		return number > 1 ? 's' : '';
	};
	const number = (num) => (num > 9 ? '' + num : '0' + num);
	const getTime = () => {
		let temp = Math.floor(milliseconds / 1000);
		const years = Math.floor(temp / 31536000);
		if (years) {
			const month = number(givenTime.getUTCMonth() + 1);
			const day = number(givenTime.getUTCDate());
			const year = givenTime.getUTCFullYear() % 100;
			return `${day}-${month}-${year}`;
		}
		const days = Math.floor((temp %= 31536000) / 86400);
		if (days) {
			if (days < 28) {
				return days + ' day' + numberEnding(days);
			} else {
				const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
				const month = months[givenTime.getUTCMonth()];
				const day = number(givenTime.getUTCDate());
				return `${day} ${month}`;
			}
		}
		const hours = Math.floor((temp %= 86400) / 3600);
		if (hours) {
			return `${hours} hour${numberEnding(hours)} ago`;
		}
		const minutes = Math.floor((temp %= 3600) / 60);
		if (minutes) {
			return `${minutes} minute${numberEnding(minutes)} ago`;
		}
		return 'a few seconds ago';
	};
	return getTime();
}

export function stringToInt(value, defValue = 0) {
	if (!value) {
		return 0;
	} else if (!isNaN(value)) {
		return parseInt(value, 10);
	}
	return defValue;
}
export function stringToPosetiveInt(value, defValue = 0) {
	const val = stringToInt(value, defValue);
	return val > -1 ? val : defValue;
}
//#endregion

//#region CUSTOM
export function addressToString(address) {
	let res = null;

	res = address.street ? address.street : null;
	res = address.wardName ? (res ? `${res}, ${address.wardName}` : address.wardName) : res;
	res = address.districtName ? (res ? `${res}, ${address.districtName}` : address.districtName) : res;
	res = address.provinceName ? (res ? `${res}, ${address.provinceName}` : address.provinceName) : res;
	return res;
}

export function infoTotal(page, limit, total) {
	if (total === 0) return <p style={{ textAlign: 'right', fontSize: '13px', fontStyle: 'italic' }}>{total} kết quả</p>;
	if (page && limit) {
		let startIndex = total === 0 ? 0 : (page - 1) * limit + 1;
		let endIndex = total === 0 ? 0 : page * limit;
		if (endIndex > total) endIndex = total;
		return (
			<p style={{ textAlign: 'right', fontSize: '13px', fontStyle: 'italic', paddingRight: 2 }}>
				{startIndex}-{endIndex} trong {total} kết quả
			</p>
		);
	}
	return <p style={{ textAlign: 'right', fontSize: '13px', fontStyle: 'italic' }}>{total} kết quả</p>;
}

export function objectToString(obj, character) {
	let res = null;
	character = character || ', ';
	var key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) {
			res = obj[key] ? (res ? `${res}${character}${obj[key]}` : obj[key]) : res;
		}
	}
	return res;
}

//#endregion

//#region validate
//NOTE: `callback` is deprecated
// export function validatePassword(rule, value, callback) {
//   if (value && !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value))) {
//     callback("Mật khẩu ít nhất 8 kí tự, bao gồm ít nhất có 1 chữ số, chữ hoa, chữ thường và kí tự đặc biệt!");
//   }
//   callback();
// };
export function formatCurrency(value, n, x) {
	// var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	// return value.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
}
export function formatLocalDateTime(value, format) {
	return moment(moment.utc(value).toDate()).local().format(format);
}
export function getTimeZoneLocal() {
	return new Date().getTimezoneOffset() / -60;
}
export function validateEmail(rule, value) {
	if (
		value &&
		!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			value
		)
	) {
		return Promise.reject('Không đúng định dạng email!');
	}
	return Promise.resolve();
}
export function validatePassword(rule, value) {
	if (value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_-])[A-Za-z\d@$!%*?&#^()_-]{8,}$/.test(value)) {
		return Promise.reject('Mật khẩu ít nhất 8 kí tự, bao gồm ít nhất có 1 chữ số, chữ hoa, chữ thường và kí tự đặc biệt!');
	}
	return Promise.resolve();
}
export function validateName(rule, value) {
	if (value && /[\d-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/]/.test(value)) {
		return Promise.reject('Họ tên không bao gồm chữ số và ký tự!');
	}
	return Promise.resolve();
}
export function validatePhoneNumber(rule, value) {
	if (value && !/^[0-9]{8,10}$/.test(value)) {
		return Promise.reject('Số điện thoại 8 đến 10 kí tự số!');
	}
	return Promise.resolve();
}
export function validateNoSpecialCharacter(rule, value) {
	if (value && /[\-!@#$%^&*()_+|~=`{}\\[\]:";'<>?,.\/]/.test(value)) {
		return Promise.reject('Không được chứa kí tự đặc biệt!');
	}
	return Promise.resolve();
}
export function validateNumberIntWithZero(rule, value, callback) {
	// ^[0-9]\d*(\.\d+)?$
	// (?<=\s|^)\d+(?=\s|$)
	if (value && !/^[0-9]\d*(\.\d+)?$/.test(value)) {
		return Promise.reject('Vui lòng nhập số nguyên.');
	}
	return Promise.resolve();
}
export function validateNumberInt(rule, value) {
	if (value && !/^[1-9][0-9]*$/.test(value)) {
		return Promise.reject('Vui lòng nhập số nguyên lớn hơn 0.');
	}
	return Promise.resolve();
}
export function validateNumberGreateThanZero(rule, value) {
	if (value && !/^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/.test(value)) {
		return Promise.reject('Số lớn hơn 0.');
	}
	return Promise.resolve();
}

export const checkEmail = (email) => {
	var re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

export const checkPhoneNumber = (value) => {
	var re = /^[0-9]{8,10}$/;
	return re.test(String(value).toLowerCase());
};

//#endregion

//#region Antd UPLOAD

export function getBase64(img, callback) {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}
export function getBase64List(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}
export function beforeUpload(file, messages) {
	const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
	if (!isJpgOrPng) {
		message.error(messages['common.message.error.wrongImageType'] || 'You can only upload JPG/PNG file!');
	}
	const isLt2M = file.size / 1024 / 1024 < 5;
	if (!isLt2M) {
		message.error(messages['common.message.error.imageBiggerThan2MB'] || 'Image must smaller than 5MB!');
	}
	return isJpgOrPng && isLt2M;
}
export function base64toImage(imageUrl, sliceSize) {
	var block = imageUrl.split(';');
	// Get the content type of the image
	var contentType = block[0].split(':')[1]; // In this case "image/gif"
	// get the real base64 content of the file
	var b64Data = block[1].split(',')[1];

	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new File(byteArrays, `file_${Date.now()}.png`, { type: contentType });
	return blob;
}

//#endregion

//#region Sweet Alert

export const SWType = {
	ADD: 1,
	UPDATE: 2,
	DELETE: 3,
	SEND_NOTI: 4,
};
export function _swSuccess(messages, model) {
	var text = model?.text || messages['modal.notify.content.updateSuccess'];
	if (model?.type === SWType.DELETE) text = messages['modal.notify.content.deleteSuccess'];
	if (model?.type === SWType.ADD) text = messages['modal.notify.content.createSuccess'];
	if (model?.type === SWType.UPDATE) text = messages['modal.notify.content.updateSuccess'];
	if (model?.type === SWType.SEND_NOTI) text = messages['modal.notify.content.sendNotiSuccess'];
	// var text = model?.text ||
	//   model?.isDelete ? messages['modal.notify.content.deleteSuccess']
	//   : model?.isAdd ? messages['modal.notify.content.createSuccess']
	//     : messages['modal.notify.content.updateSuccess']

	swal({
		title: messages['modal.notify.title.success'],
		text,
		icon: 'success',
		buttons: [false, messages['modal.label.ok']],
	});
}
export function _swError(messages, error) {
	var err = messages[error] ? messages[error] : messages['modal.notify.content.error'];
	swal({
		title: messages['modal.notify.title.error'],
		text: error,
		icon: 'error',
		buttons: [false, messages['modal.label.ok']],
	});
}
export function _swDeleteError(messages, error) {
	var err = messages[error] ? messages[error] : messages['modal.notify.content.deleteError'];
	swal({
		title: messages['modal.notify.title.deleteError'],
		text: error,
		icon: 'error',
		buttons: [false, messages['modal.label.ok']],
	});
}
//#endregion

function getExtension(filename) {
	var parts = filename.split('.');
	return parts[parts.length - 1];
}

export const isMp3 = (filename) => {
	var ext = getExtension(filename);
	switch (ext.toLowerCase()) {
		case 'mp3':
			// etc
			return true;
	}
	return false;
};

export const setFieldArrInput = (objectArray) => {
	return objectArray?.reduce(function (accumulator, obj, currentIndex) {
		return { ...accumulator, [`sentence${obj.id}`]: obj.key, [`voca${obj.id}`]: obj.linkingKeys };
	}, {});
};

export const setFieldArrKey = (objectArray) => {
	return objectArray?.reduce(function (accumulator, obj, currentIndex) {
		return { ...accumulator, [`key${currentIndex + 1}`]: obj.key };
	}, {});
};

export const setFieldArrSolution = (objectArray) => {
	return objectArray?.reduce(function (accumulator, obj) {
		return { ...accumulator, [`solution${obj.id}`]: obj.solution };
	}, {});
};

export const setFieldArrAnswer = (objectArray) => {
	return objectArray?.reduce(function (accumulator, obj, currentIndex) {
		return { ...accumulator, [`answer_${obj.id}`]: obj.key };
	}, {});
};
