import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './SearchBar.css';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Badge from 'react-bootstrap/Badge';
import axios from "axios";
import Popup from './PopupSearchBar';
import { useLocation, Link } from 'react-router-dom';
import { FormControl, FormGroup } from "react-bootstrap";

const SearchBar = ({getFilteredData}) => {

    // const location = useLocation();


    // const [queData, setQueData] = useState([]);
    // const [filData, setFilData] = useState({
    //     title:"",
    //     description: "",
    //     tags:[],
    //     createdAt:"",
    //     _id:""
    // });

    const [searchBarData, setSearchBarData] = useState(null);
    const handleSearchBarData = async (e) => {
        setSearchBarData(e.target.value); 
        console.log(searchBarData)
    }
    const handleSearch = ()  => {
        const queryParams = new URLSearchParams({ q: searchBarData });
        window.location.href = `/home?${queryParams.toString()}`;
    }

    // const getFilteredItem = (searchBarData, queData) => {
    //     if(!searchBarData){
    //         return queData;
    //     }
    //     return queData.filter(question => question.title.toLowerCase().includes(searchBarData));
    // }
    // const filteredData = getFilteredItem(searchBarData, queData);
    // console.log(filteredData.length);

    // useEffect(() => {
    //     getQueData();
    // }, []);
    // const getQueData = async () => {
    //     await axios.get('http://localhost:3005/questions').then(res => {
    //         setQueData(res.data.questions);
    //         })
    //         .catch(err => {
    //         console.log(err);
    //         });
    // }

    // const handleFindData = (e) => {
    //     e.preventDefault();
    //     getFilteredData(searchBarData);
    // };


    // const [isOpen, setIsOpen] = useState(false);
 
    // const togglePopup = () => {
    //     setIsOpen(!isOpen);
    // }
return (
    <div  className="containerSearch">
        <Container>
            <Row>
                <Col><p className="highlightedText">Hello, Ask me Anything?</p></Col>
            </Row>
            <Row>
                <Col xs={3}></Col>
                <Col>
                <Form>
                    <FormGroup className="serchBarGroup">
                    <Form.Control className="SearchBarInput"
                        name="searchBar"
                        type="text"
                        value={searchBarData}
                        onChange={handleSearchBarData }
                        // onFocus={togglePopup}
                        // onBlur={togglePopup}
                        placeholder="Ask Something"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                    
                    <Link to={"/home"} onClick={handleSearch} > 
                        <FormControl
                        type="button"
                        
                        id="basic-addon2"
                        className="SearchBarButton"
                        value={"Search"} />
                     </Link>
                    </FormGroup>
                    
                </Form>

                {/* <InputGroup className="mb-2">
                    <Form.Control className="SearchBarInput"
                    name="searchBar"
                    type="text"
                    value={searchBarData}
                    onChange={handleSearchBarData }
                    onFocus={togglePopup}
                    onBlur={togglePopup}
                    placeholder="Ask Something"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    />
                    
                    <InputGroup.Text id="basic-addon2" onClick={handleFindData} className="SearchBarButton">Search</InputGroup.Text></Link>
                </InputGroup> */}
                
                </Col>
                <Col xs={3}></Col>
            </Row>
            <Row>
                <Col xs={4}></Col>
                <Col className="badgeRowSearch">
                    <Badge className="badgeSearch">Java</Badge>
                    <Badge className="badgeSearch">Python</Badge>
                    <Badge className="badgeSearch">JavaScript</Badge>
                    <Badge className="badgeSearch">Database</Badge>
                </Col>
                <Col xs={3}></Col>
            </Row>
        </Container>
    </div>
);
};

export default SearchBar;