import { PlusOutlined } from '@ant-design/icons';
import { beforeUpload, getBase64List } from '@iso/lib/helpers/utility';
import { Modal, Upload } from 'antd';
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Wrapper } from './Upload.styles';
const domain = process.env.REACT_APP_API_KEY

const UploadMulti = (props) => {

    const { images, setImages } = props;
    const { messages } = useIntl();
    // const [images, setImages] = useState([
    // {
    //     uid: '-1',
    //     name: 'image.png',
    //     status: 'done',
    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // }
    // ])
    const [preview, setPreview] = useState({ visible: false, image: '', title: '' });

    const handleCancel = () => setPreview({ visible: false });

    const handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64List(file.originFileObj);
        }
        setPreview({
            image: file.url || file.preview,
            visible: true,
            title: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    const handleChange = ({ file, fileList }) => {
        let files = fileList.filter(file => !!file.status);
        setImages(files);
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <Wrapper>
            <Upload
                action={`${domain}/api/Commons/CheckUpload`}
                listType="picture-card"
                fileList={images}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={(file, fileList) => beforeUpload(file, messages)}
            >
                {images.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
                visible={preview.visible}
                title={preview.title}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt="example" style={{ width: '100%' }} src={preview.image} />
            </Modal>
        </Wrapper>
    );
}

export default UploadMulti;