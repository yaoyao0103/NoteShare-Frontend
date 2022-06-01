import PropTypes from 'prop-types';
import Text from "../Text/Text";
import './Title.css'

function Title(props) {
    return (
        <div id='Title' className="Title">
            <div id='Title__Title' className="Title__Title" flex={3}><Text color='black' cls='Default' content={props.title} fontSize={props.size} display="inline-block" /></div>
        </div>
        );
}
Title.propTypes = {
    title:PropTypes.string,
};
Title.defaultProps = {
    title:'Unknown',
    size:'35'
};
export default Title;