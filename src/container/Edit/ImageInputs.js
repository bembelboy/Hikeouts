import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import classNames from 'classnames';

import styles from './ImageInput.module.css';


const ImageInput = (props) => {


    const inputClasses = classNames({
        [styles.ImageInput_BackgroundInput]: props.ImageInput_Background,
        [styles.ImageInput_ProfileInput]: props.ImageInput_Profile,
        [styles.ImageInput_PostInput]: props.ImageInput_Post
    })
    const imageClasses = classNames({
        [styles.ImageInput_BackgroundImage]: props.ImageInput_Background,
        [styles.ImageInput_ProfileImage]: props.ImageInput_Profile,
        [styles.ImageInput_PostImage]: props.ImageInput_Post,
    })

    const imageBoxClasses = classNames({
        [styles.ImageInput_PreviewContainer]: props.ImageInput_Post,
    })


    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            props.setFile(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });


    const thumbs = props.file.map(f => (
        <div key={f.name}>
            <div className={imageBoxClasses}>
                <img
                    alt='Preview'
                    src={f.preview}
                    className={imageClasses}
                />
            </div>
        </div>
    ))

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        props.file.forEach(file => URL.revokeObjectURL(file.preview));
    }, [props.file]);

    return (
        <section>
            {props.file.length > 0 ?
                null
                :
                <div {...getRootProps({ className: 'dropzone' })}>
                    <input {...getInputProps()} />
                    <p className={inputClasses} >{props.text}</p>
                </div>
            }

            {thumbs}
        </section>
    );
}

export default ImageInput