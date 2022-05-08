import React,{useEffect,useRef,useState} from 'react';
import * as faceapi from "face-api.js";
import CircularProgress from '@material-ui/core/CircularProgress/';
import Button from '@material-ui/core/Button/';
import Backdrop from '@material-ui/core/Backdrop/';
export default function IdentityVerif() {

    const [firstImg, setFirstImg] = useState('');
    const [secondImg, setSecondImg] = useState('');
    const [noFacesFound, setNoFacesFound] = useState(false);
    const [moreThanOneFace, setMoreThanOneFace] = useState(false);
    const [matchFound, setMatchFound] = useState(null);
    const [loading, setLoading] = useState(false);
    //Camera
    let videoRef = useRef(null);
    let photoRef = useRef(null);

    const handleFirstImageUpload = (e) => {
        let img = e.target.files[0];
        let canvas = document.getElementById('canvas1');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setFirstImg(URL.createObjectURL(img));
    }

    const handleSecondImageUpload = (e) => {
        let img = e.target.files[0];
        let canvas = document.getElementById('canvas2');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        setSecondImg(URL.createObjectURL(img));
    }
    const checkMatch = async () => {
        setLoading(true);
        setMatchFound(null);
            let firstImg = document.getElementById('first-img');
            let faces = await faceapi.detectAllFaces(firstImg).withFaceLandmarks().withFaceDescriptors().withFaceExpressions().withAgeAndGender();
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
        .then(() => {console.log('models loaded')})
        .catch(err => {console.log(err)})
    };

    const getUserCamera  =  () => {
        navigator.mediaDevices.getUserMedia({ video: true }) 
        .then(stream => {
            let video = videoRef.current;
            video.srcObject = stream;
            video.play();
        }).catch(err => {console.log(err)});
    }

    const takePicture = () => {
        let width = 500;
        let height = 500;
        let photo = photoRef.current;
        let video = videoRef.current;
        photo.width = width;
        photo.height = height;
        let ctx = photo.getContext('2d');

        ctx.drawImage(video, 0, 0, photo.width, photo.height);
    }

    const clearPicture = () =>{
        let photo = photoRef.current;
        let ctx = photo.getContext('2d');
        ctx.clearRect(0, 0, photo.width, photo.height);

    }
    useEffect(() => {
        loadModels();
        getUserCamera();
    }, [])
    return (
        <div className="main">
            <div className='container'>
            <video id="video" ref={videoRef} autoPlay></video>
            <button onClick={takePicture}>Take Photo</button>
            <canvas ref={photoRef}></canvas>
            <button onClick={clearPicture}>Clear Photo</button>
            </div>

        <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFirstImageUpload}
        />

        <div className="img-container" style={{ position: 'relative' }}>
            <img
                id="first-img"
                src={firstImg}
                style={{ height: 300, width: 300 }}
            />
            <canvas id="canvas1" width="300px" height="300px"></canvas>
        </div>


        <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleSecondImageUpload}
        />

        <div className="img-container" style={{ position: 'relative' }}>
            <img
                id="second-img"
                src={secondImg}
                style={{ height: 300, width: 300 }}
            />
            <canvas id="canvas2" width="300px" height="300px"></canvas>
        </div>

        <Button
            onClick={checkMatch}
            disabled={!firstImg || !secondImg}
            variant="contained" color="primary" style={{ margin: '10px auto' }}>
            Check Match
        </Button>

        {matchFound == "found" ?
            <p>Match Found!!</p>
            : matchFound == "not found" ?
                <p>No matches found</p>
                : ""}

        {noFacesFound ?
            <p>No faces found in first image. Please upload image with 1 face</p>
            : ""}

        {moreThanOneFace ?
            <p>More than one face found in first image. Pleae upload photo with only one face</p>
            : ""}

        {loading ?
            <Backdrop open={loading}
                style={{ zIndex: 100000, color: 'fff' }}>
                <p style={{ color: '#fff', fontSize: 20, fontWeight: 900 }}>Analyzing images...</p>
                <CircularProgress color="secondary" />
            </Backdrop>
            : ""}
    </div>
    );
}