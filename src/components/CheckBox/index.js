import React from "react";
import {View} from 'react-native';


const CheckBox = ({options = [], onChange}) => {
    return (<View>
        {options.map((op, index) => (
            <text>{op?.text}</text>

        ))}
        </View>
    );
};

export default CheckBox;