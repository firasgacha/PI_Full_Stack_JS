import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from "face-api.js";
import CircularProgress from '@material-ui/core/CircularProgress/';
import Button from '@material-ui/core/Button/';
import Backdrop from '@material-ui/core/Backdrop/';
import Navbar from '../components/Navbars/IndexNavbar';
import Footer from '../components/Footers/Footer';
//Imgs
import defaultImg from '../assets/img/cin.png';
export default function IdentityVerif() {

    const [firstImg, setFirstImg] = useState('');
    const [secondImg, setSecondImg] = useState(defaultImg);
    const [noFacesFound, setNoFacesFound] = useState(false);
    const [moreThanOneFace, setMoreThanOneFace] = useState(false);
    const [matchFound, setMatchFound] = useState(null);
    const [loading, setLoading] = useState(false);
    //Camera
    let videoRef = useRef(null);
    let photoRef = useRef(null);
    //steps
    const [step1, setStep1] = useState("step");
    const [step2, setStep2] = useState("step");
    const [step3, setStep3] = useState("step");
    const [step4, setStep4] = useState("step");
    //image size
    const [sizeAlert, setSizeAlert] = useState('');

    // const handleFirstImageUpload = (e) => {
    //     let img = e.target.files[0];
    //     let canvas = document.getElementById('canvas1');
    //     const context = canvas.getContext('2d');
    //     context.clearRect(0, 0, canvas.width, canvas.height);
    //     setFirstImg(URL.createObjectURL(img));
    // }

    const handleSecondImageUpload = (e) => {
        let img = e.target.files[0];
        if (img.size > 1048576) {
            setSizeAlert("Image too large max size 1MB");
        } else {
            let canvas = document.getElementById('canvas2');
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
            setSecondImg(URL.createObjectURL(img));
            setStep1("step step-primary");
            setSizeAlert("");
        }

    }
    const checkMatch = async () => {
        setStep3('step step-primary');
        setLoading(true);
        setMatchFound(null);
        let firstImg = document.getElementById('first-img');
        let faces = await faceapi.detectAllFaces(photoRef.current).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
        faces = faceapi.resizeResults(faces, { height: 300, width: 300 });
        faceapi.draw.drawDetections(document.getElementById('canvas1'), faces);

        switch (faces.length) {
            case 0:
                setLoading(false);
                setNoFacesFound(true);
                break;
            case 1:
                findMatch(faces[0]);
                break;
            default:
                setMoreThanOneFace(true);
                break;
        }
    }

    const findMatch = async (face) => {
        let matchScore = .63;
        let secondImg = document.getElementById('second-img');
        let faces = await faceapi.detectAllFaces(secondImg).withFaceLandmarks().withFaceDescriptors();
        let labledFace = new faceapi.LabeledFaceDescriptors('Face', [face.descriptor]);
        let faceMatcher = new faceapi.FaceMatcher(labledFace, matchScore);

        let results = await faces.map(f => {
            return faceMatcher.findBestMatch(f.descriptor);
        })
        if (results.findIndex(i => i._label == "Face") !== -1) {
            let matched = [faces[results.findIndex(i => i._label == "Face")]];
            matched = faceapi.resizeResults(matched, { height: 300, width: 300 });
            faceapi.draw.drawDetections(document.getElementById('canvas2'), matched, { withScore: false });
            setMatchFound("found");
            setLoading(false);
            setStep4('step step-primary');
        }
        else {
            setMatchFound("not found");
            setLoading(false);
        }
    }

    const loadModels = () => {
        Promise.all([
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.mtcnn.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceLandmark68TinyNet.loadFromUri('/models'),
            faceapi.nets.ageGenderNet.loadFromUri('/models'),
        ])
            .then(() => { console.log('models loaded') })
            .catch(err => { console.log(err) })
    };

    const getUserCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                let video = videoRef.current;
                video.srcObject = stream;
                video.play();
            }).catch(err => { console.log(err) });
    }

    const takePicture = () => {
        let width = 300;
        let height = 300;
        let photo = photoRef.current;
        let video = videoRef.current;
        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext('2d');
        ctx.drawImage(video, 0, 0, photo.width, photo.height);
        setFirstImg(photoRef.current);
        video.pause();
        setStep2("step step-primary");
    }

    const clearPicture = () => {
        let video = videoRef.current;
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');
        ctx.clearRect(0, 0, photo.width, photo.height);
        setFirstImg('');
        video.play();
        setStep1("step");
        setStep2("step");
        setStep3('step');
        setStep4('step');
        setSecondImg(defaultImg);
    }

    useEffect(() => {
        loadModels();
        getUserCamera();
    }, [])
    return (
        <>
            <Navbar />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="flex flex-row flex-wrap justify-around">
                <div className="flex-col">
                    <div className="flex justify-center mb-2">
                        <div class="badge badge-lg">Upload your identity passport or national identity</div>
                    </div>
                    <div className="img-container" style={{ position: 'relative' }}>
                        <img
                            id="second-img"
                            src={secondImg}
                            style={{ height: 320, width: 500 }}
                        />
                        <canvas id="canvas2" width="30px" height="30px" hidden></canvas>
                    </div>
                    {sizeAlert ? <div class="alert alert-error shadow-lg mt-1">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Error! {sizeAlert}.</span>
                        </div>
                    </div> : null}
                    <input
                        className="mt-2"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        onChange={handleSecondImageUpload}
                    />
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">jpeg, PNG, JPG (Max_Size. 1MB).</p>

                </div>
                <div class="flex-col">
                    <div className="flex justify-center mb-2">
                        <div class="badge badge-lg">Take a clear picture </div>
                    </div>
                    <div className='container'>
                        <canvas id="canvas1" ref={photoRef} hidden></canvas>
                        <video id="video" ref={videoRef} style={{ height: 320, width: 500 }}></video>
                        <div className='flex justify-around mt-5'>
                            {firstImg ?
                                <button className='btn btn-error' onClick={clearPicture}>Clear Photo</button>
                                :
                                <button className='btn' onClick={takePicture}>Take Photo</button>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex-col">
                    <ul className="steps steps-vertical">
                        <li className={step1}>Take a photo</li>
                        <li className={step2}>Upload Your Identity</li>
                        <li className={step3}>Press Button To check</li>
                        <li className={step4}>Get Result</li>
                    </ul>
                    <div className='flex flex-row justify-start mb-10'>
                        <button className='btn btn-wide btn-accent'
                            onClick={checkMatch}
                            disabled={step1 == 'step' && step2 == 'step'}
                        >
                            Check Match
                        </button>
                    </div>
                    <div className="flex flex row justify-end mb-2 mr-12">
                        {matchFound == "found" ?
                            <div class="flex-initial w-64 alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Your verification has completed successfully !!</span>
                                </div>
                            </div>
                            : matchFound == "not found" ?
                                <div class="flex-initial w-64 alert alert-error shadow-lg">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <span>Error! Verification .</span>
                                    </div>
                                </div>
                                : ""}

                        {noFacesFound ?
                            <div class="flex-initial w-64 alert alert-warning shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <span>Warning: No faces found. Please upload image with one face!</span>
                                </div>
                            </div>
                            : ""}

                        {moreThanOneFace ?
                            <div class="flex-initial w-64 alert alert-warning shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <span>Warning: More than one face found. Please upload photo with only one face!</span>
                                </div>
                            </div>
                            : ""}

                        {loading ?
                            <Backdrop open={loading}
                                style={{ zIndex: 100000, color: 'fff' }}>
                                <p style={{ color: '#fff', fontSize: 20, fontWeight: 900 }}>Analyzing images...</p>
                                <CircularProgress color="secondary" />
                            </Backdrop>
                            : ""}
                    </div>
                </div>
            </div>
            <canvas className='width-100 height-100'></canvas>
            <Footer />
            <link href="https://cdn.jsdelivr.net/npm/daisyui@2.14.2/dist/full.css" rel="stylesheet" type="text/css" />
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2/dist/tailwind.min.css" rel="stylesheet" type="text/css" />
            <script src="../path/to/flowbite/dist/flowbite.js"></script>
        </>
    );
}