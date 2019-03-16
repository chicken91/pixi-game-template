export const TimeConstants = {
    loadingViewHideDelay: 500,
    reelSpinTime: 3000
};

export const TextConstants = {
    loadingProgress: "LOADING...",
    loadingCompleted: "GAME WAS LOADED!"
};

export const InteractionEvents = {
    click: "click"
};

export const Resources = {
    images: [
        {id: "symbol_a", path: "./assets/symbol_a.png"},
        {id: "symbol_j", path: "./assets/symbol_j.png"},
        {id: "symbol_k", path: "./assets/symbol_k.png"},
        {id: "particle", path: "./assets/particle.png"}
    ]
};

export const Particles = {
    data: {
        script: {
            "alpha": {
                "start": 1,
                "end": 1
            },
            "scale": {
                "start": 1,
                "end": 1,
                "minimumScaleMultiplier": 0.2
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 100,
                "end": 100,
                "minimumSpeedMultiplier": 4
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": -30,
                "max": 30
            },
            "lifetime": {
                "min": 7,
                "max": 7
            },
            "blendMode": "normal",
            "frequency": 0.04,
            "emitterLifetime": -1,
            "maxParticles": 200,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 0,
                "y": 0,
                "r": 10
            }
        },

        texture: "particle"
    }
};
