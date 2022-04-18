    import { makeStyles } from "@material-ui/core/styles";
    import RemoveIcon from "../../assets/images/close.svg";
    

    const useStyles = makeStyles(() => ({
        wrapper: {
            position: 'relative',
            width: 'fit-content',
            borderRadius: '8px',
            marginTop: '1.5rem'
        },
        image: {
            width: '200px',
        },
        close: {
            position: 'absolute',
            top: '8px',
            right: '8px'
        }
    }));
const PreviewImage = ({ url, onClose}) => {
const classes=useStyles()

    return (
      <div className={classes.wrapper}>
        <img src={url} className={classes.image} />
        <img src={RemoveIcon} onClick={onClose} className={classes.close} />
      </div>
    );
    
}

export default PreviewImage