import React, {useEffect, useRef, useState} from "react";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import {useDispatch, useSelector} from "react-redux";
import {dispatchGetAllUsers, fetchAllUsers} from "../redux/actions/userActions";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Paper,
  Typography,
  Modal, ImageList, ImageListItem, Popover, Grid, Avatar, TextField, Alert
} from "@mui/material";
import {useApi} from "../hooks/useApi";
import {styled}  from '@mui/system';
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import clsx from 'clsx';
import StarIcon from '@mui/icons-material/Star';
import ListFeedbacksRatingsImages from "../components/Cards/ListFeedbacksRatingsImages";
import {AccountCircle} from "@mui/icons-material";
import {queryApi} from "../tools/queryApi";
import {esES} from "@mui/material/locale";

const BackdropUnstyled = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
      <div
          className={clsx({ 'MuiBackdrop-open': open }, className)}
          ref={ref}
          {...other}
      />
  );
});

BackdropUnstyled.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const styleratecomment = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  bgcolor: 'background.paper',
  boxShadow: '0 3px 7px rgba(25, 118, 210, 0.3);',
  p: 4,
};


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: '0 3px 7px rgba(25, 118, 210, 0.3);',
  p: 4,
};
const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.05) !important;
  -webkit-tap-highlight-color: transparent;
`;

const labels = {
  0: 'Useless',
  1: 'Useless+',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


export default function Landing() {
  const[dataindex,setDataindex]=useState({
    categorie:"",
    description:"",
    price:0,
    etat:"",
    multi_files:[],
    rate:[],
    feedback:[]
  })
  const[dataadd,setDataadd]=useState({
    id_p:""
  })
  const [show, setShow] = useState(false);
  const auth = useSelector(state => state.auth)
  const users = useSelector(state => state.users)
  const token = useSelector(state => state.token)
  const {user , isLogged} = auth
  const dispatch = useDispatch()

  useEffect(() => {
    if(isLogged) {
      fetchAllUsers(token).then(res => {
        dispatch(dispatchGetAllUsers(res))
      })
    }
  },[dispatch,isLogged])

  const [open, setOpen] =useState(false);
  const [opentwo, setOpentwo] =useState(false);
  let [products,err,relaod]= useApi('products/getjson');
  let [productstimer,errtimer,relaodtimer]= useApi('products/getjson');
  const [errors, setErrors] = useState({ visbile: false, message: "" });
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [valuecomment, setValuecomment] = useState("");
  let inputNode=useRef();
  let check_add=false;
  let check_del=false;
  let check_auth;
  let msg;

  function handleOpen(prod){
    setDataindex({
      categorie:prod['prod'].Categorie.name,
      description:prod['prod'].Description,
      price:prod['prod'].Price,
      etat:prod['prod'].Etat,
      multi_files:prod['prod'].Images,
      rate:prod['prod'].Rate,
      feedback:prod['prod'].Feedback
    });
    setOpen(true);
  }

  function handleOpentwo(id) {
    setDataadd({id_p: id})
    setOpentwo(true);
  }

  const handleClosetwo= () => {
    setDataadd({id_p: ""});
    setHover(-1);
    setValue(2);
    setValuecomment("");
    setOpentwo(false);
  }


  const handleClose = () => {
    setDataindex({
      categorie:"",
      description:"",
      price:0,
      etat:"",
      multi_files:[],
      rate:[],
      feedback:[]
    });
    setOpen(false);
  }

  useEffect(() => {
    const interval = setInterval(relaodtimer, 1000);
    return () => {
      clearInterval(interval);}
  }, []);

  /**
   * Suppression d'une manière dynamique
   */
  if(productstimer!=null) {
    if (productstimer.length) {
      for (var a in productstimer) {
        for (var b in products) {
          for (var c in productstimer) {
            if (products[b]['_id'] == productstimer[c]['_id']) {
              check_del = true
            }
          }
          if (!check_del)
            products.splice(products[b], 1)
          check_del = false;
        }
      }
    }else
      products.length=0
  }


  /**
   * Ajout,Modification
   * d'une manière dynamique
   */
  for (var i in productstimer) {
    for (var j in products) {
      if (productstimer[i]['_id'] == products[j]['_id']) {
        if (products[j]['Categorie']['name'] != productstimer[i]['Categorie']['name'])
          products[j]['Categorie']['name'] = productstimer[i]['Categorie']['name']
        if (products[j]['Description'] != productstimer[i]['Description'])
          products[j]['Description'] = productstimer[i]['Description']
        if (products[j]['Etat'] != productstimer[i]['Etat'])
          products[j]['Etat'] = productstimer[i]['Etat']
        if (products[j]['Price'].toString() != productstimer[i]['Price'].toString())
          products[j]['Price'] = productstimer[i]['Price']
        if (!(JSON.stringify(products[j]['Feedback']) === JSON.stringify(productstimer[i]['Feedback'])))
          products[j]['Feedback'] = productstimer[i]['Feedback']
        if (!(JSON.stringify(products[j]['Rate']) === JSON.stringify(productstimer[i]['Rate'])))
          products[j]['Rate'] = productstimer[i]['Rate']
        if (!(JSON.stringify(products[j]['Images']) === JSON.stringify(productstimer[i]['Images'])))
          products[j]['Images'] = productstimer[i]['Images']
        check_add = true;
      }
    }
    if (!check_add)
      products.push(productstimer[i])

    check_add = false;
  }

  if(show)
    msg=<Alert severity="info" onClose={() => setShow(false)} >
      Thanks for sharing with us
    </Alert>

  const submit = async (e)=>{
    e.preventDefault();
    if (window.confirm("Are you sure ?")) {
      setShow(true)
      setTimeout(()=>setShow(false),2000);
      setTimeout(()=>handleClosetwo(),2000);
    const [, errtwo] = await queryApi("products/combined", {id_u:user._id,id_p:dataadd.id_p,comment:valuecomment, stars: value}, "POST", false);
    if (errtwo) {
      setErrors({
        visbile: true,
        message: JSON.stringify(errtwo.errors, null, 2),
      });
    }
    }
  }

  if(isLogged)
    check_auth=<>
        <h1 className="text-white font-semibold text-5xl">
      Welcome back.
    </h1>
  <p className="mt-4 text-lg text-blueGray-200">
      {user['name']}
    </p>
    </>
  else
    check_auth=<>
      <h1 className="text-white font-semibold text-5xl">
        <Link to="/auth/login">Login or</Link>
      </h1>
        <p className="mt-4 text-lg text-blueGray-200">
      <Link to="/auth/register">Create your account</Link>
    </p>
      </>

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  {check_auth}
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">

            <div className="flex flex-wrap">
              {
                  products &&  products.map((prod,index) =>
              <div key={index} className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <Card sx={{ maxWidth: 345 }}>
                      <div className="card__title">
                        <div className="icon">
                          <a className="carda" href="#"></a>
                        </div>
                        <h3 className="cardh3">{prod.Etat}</h3>
                      </div>
                      <div className="slider">
                        <div className="slides">


                      {
                        prod.Images.map((img,index) =>
                            <div key={index}>
                              <img id="taswira2" src={"http://localhost:5000/images/"+img.img}
                                   className="w-full align-middle rounded-t-lg bg-white"/>
                            </div>

                        )}
                        </div>
                      </div>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {prod.Price+" Dt"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {prod.Categorie.name}
                        </Typography>
                          <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                flexDirection:'column'
                              }}
                          >
                            {(() => {
                              if(prod.Rate.length==0){
                          return <> <Rating
                                name="hover-feedback"
                                value={0}
                                precision={0.5}
                                readOnly
                            />

                                <Box sx={{ml: 0.5}}><p>Pas d'indication</p></Box>
                          </>
                              }else {
                                return <> <Rating
                                    name="hover-feedback"
                                    value={(prod.Rate.reduce(function (accumulateur, valeurCourante) {
                                      return accumulateur + valeurCourante.Stars;
                                    },0)/prod.Rate.length).toFixed(2)}
                                    precision={0.5}
                                    readOnly
                                />
                              <Box sx={{ml: 0.5}}>

                                <PopupState variant="popover" popupId="demo-popup-popover">
                                  {(popupState) => (
                                      <div>
                                        <Button className="focus:outline-none" variant="contained" {...bindTrigger(popupState)}>
                                          {(prod.Rate.reduce(function (accumulateur, valeurCourante) {
                                          return accumulateur + valeurCourante.Stars;
                                        }, 0) / prod.Rate.length).toFixed(2)}

                                        </Button>
                                        <Popover
                                            {...bindPopover(popupState)}
                                            anchorOrigin={{
                                              vertical: 'bottom',
                                              horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                              vertical: 'top',
                                              horizontal: 'center',
                                            }}
                                        >
                                          <Typography sx={{ p: 2 }}>
                                            {(() => {
                                              if(isLogged) {
                                                let user_name = []
                                                for (var c in prod.Rate) {
                                                  for (var d in users) {
                                                    if (prod.Rate[c]['User'] == users[d]['_id'])
                                                      user_name.push(users[d]['name'])
                                                  }
                                                }
                                                let p=[];
                                                let index=0;
                                                for (var b in prod.Rate)
                                                {
                                                  p.push(
                                                   <Box key={index}
                                                      sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexDirection: 'column'
                                                      }}
                                                  >
                                                     {user_name[index++]}
                                                    <Rating
                                                        name="hover-feedback"
                                                        value={prod.Rate[b]['Stars']}
                                                        getLabelText={getLabelText}
                                                        readOnly
                                                    />
                                                    {(
                                                        <Box sx={{ml: 0.5}}>{+prod.Rate[b]['Stars'] + " " + labels[prod.Rate[b]['Stars']]}</Box>
                                                    )}
                                                    <p style={{textAlign: "left", color: "gray"}}>
                                                      {prod.Rate[b].updatedAt + "."}
                                                    </p>
                                                     <hr width="80%" />
                                                  </Box>)
                                                }
                                                return <div style={{ padding: 14,fontFamily: "sans-serif" }} >
                                                  <h1>Stars</h1>
                                                  {p}
                                                </div>
                                              }
                                              else
                                                return <p>Please Login !</p>
                                            })()}
                                          </Typography>
                                        </Popover>
                                      </div>
                                  )}
                                </PopupState>
                              </Box>
                                </>
                              }
                            })()}

                          </Box>
                      </CardContent>
                      <CardActions>
                        <Button onClick={()=>handleOpen({prod:prod})}  style={{outline:"none"}} size="small">Details</Button>
                        {(() =>{
                          if(isLogged){
                            return <>
                            {(() =>{
                              let verif=false;
                              for(var enter1 in prod.Rate) {
                                if (user._id == prod.Rate[enter1]['User'])
                                  verif = true;
                              }
                              if(!verif)
                                return <> <Button onClick={()=>handleOpentwo(prod._id)}  style={{outline:"none"}} size="small">Rate / Leave your Comment</Button>
                                  <Button  style={{outline:"none"}} size="small">Add to list</Button></>
                              else
                                return <>
                                  <Button  style={{outline:"none"}} size="small" disabled>Rate / Leave your Comment</Button>
                                  <Button  style={{outline:"none"}} size="small">Add to list</Button>
                                </>
                            })()}
                            </>
                          }
                          else{
                            return <>
                              <Button  style={{outline:"none"}} size="small" disabled>Rate / Leave your Comment</Button>
                              <Button  style={{outline:"none"}} size="small" disabled>Add to list</Button>
                            </>
                          }
                        })()}
                      </CardActions>
                    </Card>
                  </div>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    BackdropComponent={Backdrop}
                >
                  <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Details
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {(() => {
                        const {categorie, description,price, etat,multi_files,rate,feedback}=dataindex

                      return <Box sx={{ width: 500, height: 450, overflowY: 'scroll' }}>
                        <ImageList variant="masonry" cols={3} gap={8}>
                          {multi_files.map((item) => (
                              <ImageListItem key={item.img}>
                                <img
                                    src={"http://localhost:5000/images/"+`${item.img}?w=248&fit=crop&auto=format`}
                                    srcSet={"http://localhost:5000/images/"+`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    alt={item.title}
                                    loading="lazy"
                                />
                              </ImageListItem>
                          ))}
                        </ImageList>
                        <div style={{ padding: 14,fontFamily: "sans-serif" }} >
                          <h1>{categorie}</h1>
                              <Paper key={index} style={{ padding: "40px 20px", marginTop: 20 }}>
                                <Grid container wrap="nowrap" spacing={2}>
                                  <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{ margin: 0, textAlign: "left",fontSize:'35px',fontWeight:'bold' }}>{price+" Dt"}</h4>
                                    <br/>
                                    <p style={{ textAlign: "left" }}>
                                      {description}
                                    </p>
                                  </Grid>
                                </Grid>
                              </Paper>
                        </div>
                        <ListFeedbacksRatingsImages type={"Feedbacks"} front={"front"} formdata={dataindex}/>
                      </Box>
                      })()}
                    </Typography>
                  </Box>
                </Modal>
                <Modal
                    open={opentwo}
                    onClose={handleClosetwo}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    BackdropComponent={Backdrop}
                >
                  <Box sx={styleratecomment}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      Share your experiences with the product.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {(() => {
                        const {id_p}=dataadd
                      return <form onSubmit={submit} >
                      <Box
                          sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                      >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                              setValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {(
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                      </Box>
                        <Box
                            component="form"
                            sx={{
                              '& .MuiTextField-root': { m: 1, width: '25ch',marginTop:'20px' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                          <TextField
                              id="textcomment"
                              label={user['name']}
                              multiline
                              maxRows={4}
                              value={valuecomment}
                              onChange={(event) => {
                                setValuecomment(event.target.value);
                              }}
                          />

                          <input hidden disabled type="text" name="id_p" value={id_p} onChange={(event) => {
                            setDataadd({id_p:event.target.value});
                          }}  />
                      </Box>
                        <br/>
                        <button className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150">Do it</button>
                      </form>
                      })()}
                    </Typography>
                    {msg}
                    </Box>
                </Modal>
              </div>
                  )}
              <div className="flex flex-wrap items-center mt-32">

                <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i className="fas fa-user-friends text-xl"></i>
                  </div>
                  <h3 className="text-3xl mb-2 font-semibold leading-normal">
                    Working with us is a pleasure
                  </h3>
                  <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                    Don't let your uses guess by attaching tooltips and popoves to
                    any element. Just make sure you enable them first via
                    JavaScript.
                  </p>
                  <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                    The kit comes with three pre-built pages to help you get
                    started faster. You can change the text and images and you're
                    good to go. Just make sure you enable them first via
                    JavaScript.
                  </p>
                  <Link to="/" className="font-bold text-blueGray-700 mt-8">
                    Check Notus React!
                  </Link>
                </div>

                <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                    <img
                        alt="..."
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                        className="w-full align-middle rounded-t-lg"
                    />
                    <blockquote className="relative p-8 mb-4">
                      <svg
                          preserveAspectRatio="none"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 583 95"
                          className="absolute left-0 w-full block h-95-px -top-94-px"
                      >
                        <polygon
                            points="-30,95 583,95 583,65"
                            className="text-lightBlue-500 fill-current"
                        ></polygon>
                      </svg>
                      <h4 className="text-xl font-bold text-white">
                        Top Notch Services
                      </h4>
                      <p className="text-md font-light mt-2 text-white">
                        The Arctic Ocean freezes every winter and much of the
                        sea-ice then thaws every summer, and that process will
                        continue whatever happens.
                      </p>
                    </blockquote>
                  </div>
                </div>

              </div>

            </div>



          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
