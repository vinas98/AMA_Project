import './Tag.css';


const Tag = (props) => {
    return(
        <div className='tag'>
            <h3 className='tagTitle'>{props.tagName}</h3>
            <p>{props.tagBody}</p>
        </div>
    );
}

export default Tag;