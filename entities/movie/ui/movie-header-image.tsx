import { Image, StyleSheet, View, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { height } = Dimensions.get('window');

interface Props {
    backdropPath: string | null;
    posterPath: string | null;
}

export default function MovieHeaderImage({ backdropPath, posterPath }: Props) {
    return (
        <View style={styles.headerImageContainer}>
            <Image
                source={{ uri: `https://image.tmdb.org/t/p/w780${backdropPath || posterPath}` }}
                style={styles.backdrop}
                resizeMode="cover"
            />
            <LinearGradient
                colors={['transparent', 'rgba(17, 17, 19, 0.8)', '#111113']}
                style={styles.gradient}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    headerImageContainer: {
        width: '100%',
        height: height * 0.55,
        position: 'relative',
    },
    backdrop: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '60%',
    },
});