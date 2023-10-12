import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { isMp3 } from '@iso/lib/helpers/utility';

const domain = process.env.REACT_APP_API_KEY;

const Uploader = (props) => {
	const { files, setFiles } = props;

	return (
		<Upload
			accept=".mp3, .mp4"
			fileList={files}
			beforeUpload={(file) => {
				if (file.type !== 'audio/mpeg') {
					message.error(`${file.name} is not a mp3 file`);
				}
				return file.type === 'audio/mpeg';
			}}
			onChange={(info) => {
				setFiles(info.fileList.filter((file) => !!file.status));
			}}
			action={`${domain}/api/Commons/CheckUpload`}
		>
			{files?.length >= 1 ? null : <Button icon={<UploadOutlined />}>Tải lên</Button>}
		</Upload>
	);
};

export default Uploader;
