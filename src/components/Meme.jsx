import { useState, useEffect } from "react";

export default function Meme() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        randomImage: "http://i.imgflip.com/1bij.jpg",
    });
    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => setAllMemes(data.data.memes));
    }, []);

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme((prevMeme) => ({
            ...prevMeme,
            randomImage: url,
        }));
    }

    function handleTextChange(event) {
        const { value, name } = event.target;
        setMeme((prevMeme) => ({
            ...prevMeme,
            [name]: value,
        }));
    }

    return (
        <section className="form">
            <div className="form--inputs">
                <input
                    type="text"
                    placeholder="Shut up"
                    id="input1"
                    value={meme.topText}
                    name="topText"
                    onChange={handleTextChange}
                />
                <input
                    type="text"
                    placeholder="and take my money"
                    id="input2"
                    value={meme.bottomText}
                    name="bottomText"
                    onChange={handleTextChange}
                />
            </div>
            <button
                type="button"
                className="form--button"
                onClick={getMemeImage}
            >
                Get a new meme image 🖼
            </button>

            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </section>
    );
}
