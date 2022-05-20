import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    H1Title: {
        fontFamily: 'Lora-Bold',
        fontSize: 22,
        marginBottom: 20,
        textTransform: 'uppercase',
        color: '#09091A'
    },
    H1TitleNoMargin: {
        fontFamily: 'Lora-Bold',
        fontSize: 22,
        textTransform: 'uppercase',
        color: '#09091A'
    },
    H2Title: {
        fontFamily: 'Lora-SemiBold',
        fontSize: 20,
        marginBottom: 20,
        color: '#09091A'
    },
    H2TitleCenter: {
        fontFamily: 'Lora-SemiBold',
        fontSize: 20,
        marginBottom: 20,
        color: '#09091A',
        alignSelf: 'center',
        textAlign: 'center'
    },
    H3Title: {
        fontFamily: 'Lora-SemiBold',
        fontSize: 18,
        marginBottom: 10,
        color: '#09091A'
    },
    H3TitleNoMargin: {
        fontFamily: 'Lora-SemiBold',
        fontSize: 18,
        marginBottom: 0,
        color: '#09091A'
    },
    H3Subtitle: {
        fontFamily: 'Lora-SemiBold',
        fontSize: 14,
        marginBottom: 10,
        color: '#808F9D'
    },
    Text: {
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        margin: 0,
        color: '#09091A'
    },
    TextBold: {
        fontFamily: 'Jost-Bold',
        fontSize: 16,
        margin: 0,
        color: '#09091A'
    },
    textDanger: {
        fontFamily: 'Jost-Regular',
        fontSize: 14,
        margin: 0,
        color: '#dc3545'
    },
    contentCenter: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    Subtitle: {
        fontFamily: 'Jost-Regular',
        fontSize: 14,
        margin: 0,
        textTransform: 'uppercase',
        color: '#808F9D'
    },
    MarginBottom10: {
        marginBottom: 10,
    },
    MarginBottom15: {
        marginBottom: 15,
    },
    MarginBottom20: {
        marginBottom: 20,
    },
    MarginBottom40: {
        marginBottom: 40,
    },
    MarginBottom60: {
        marginBottom: 60,
    },
    ContainerPrimaryButton: {
        marginTop: 30,
        marginBottom: 60,
    },
    ContainerPrimaryButtonBottom: {
        position: 'absolute',
        bottom: 60,
        right: 15,
        width: '100%',
    },
    PrimaryButton: {
        backgroundColor: '#DD6E42',
        paddingVertical: 15,
        borderRadius: 30,
    },
    PrimaryButtonText: {
        fontFamily: 'Jost-Medium',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    SecondaryButton: {
        backgroundColor: '#3D5C76',
        paddingVertical: 15,
        borderRadius: 30,
    },
    SecondaryButtonText: {
        fontFamily: 'Jost-Medium',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    PrimaryButtonIcon: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DD6E42',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    PrimaryButtonIconIcon: {
        width: 25,
        height: 25,
        marginRight: 20
    },
    PrimaryButtonIconText: {
        fontFamily: 'Jost-SemiBold',
        fontSize: 16,
        textTransform: 'uppercase',
        color: '#FFFFFF',
        textAlign: 'center'
    },
    ContainerRadioButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: -5
    },
    ContainerView: {
        paddingTop: 20,
        paddingHorizontal: 15,
        flex: 1,
    },
    AddIcon: {
        backgroundColor: '#DD6E42',
        borderRadius: 30,
        padding: 5,
        marginRight: 15
    },
    CancelTextLink: {
        marginLeft: 15
    },
    CancelText: {
        fontFamily: 'Jost-SemiBold',
        color: '#808F9D',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase'
    },
    CancelTextCenter: {
        fontFamily: 'Jost-SemiBold',
        color: '#808F9D',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'uppercase',
        textAlign: 'center'
    },
    IconHeaderLeft: {
        marginLeft: 15
    },
    IconHeaderRight: {
        marginRight: 15
    },
    ButtonOther: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D8DBDC',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        margin: 5,
    },
    TextOther: {
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        color: '#09091A',
        marginRight: 10
    },
    HeaderH3Clothing: {
        backgroundColor: '#F0F1F1'
    },
    ClothingView: {
        marginBottom: 15
    },
    ClothingList: {
        margin: -7,
    },
    ClothingRow: {
        justifyContent: 'flex-start'
    },
    ClothingCol: {
        flex: 1 / 3
    },
    ClothingMargin: {
        margin: 7,
    },
    ClothingCard: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        width: '100%',
        aspectRatio: 1
    },
    CardClothingImg: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    CardAddContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    CardAddCol: {
        flex: 1 / 3
    },
    CardAddMargin: {
        margin: 7,
    },
    CardAddButton: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    CardAddIcon: {
        backgroundColor: '#808F9D',
        width: 30,
        height: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    modalTitle: {
        width: 250
    },
    modalClose: {
        marginTop: 3,
        marginLeft: 10
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#ACB5BC',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    ContainerRatingButton: {
        borderWidth: 1,
        borderColor: '#ACB5BC',
        borderRadius: 30,
        paddingVertical: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    RatingButton: {
        marginHorizontal: 5,
    },
    ContainerRating: {
        flexDirection: 'row',
    },
    RatingStars: {
        marginHorizontal: 2,
    },
    RadioButtonUnselected: {
        backgroundColor: '#D8DBDC',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        margin: 5,
    },
    RadioButtonSelected: {
        backgroundColor: '#DD6E42',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        margin: 5,
    },
    RadioTextUnselected: {
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        color: '#09091A'
    },
    RadioTextSelected: {
        fontFamily: 'Jost-Regular',
        fontSize: 16,
        color: '#FFFFFF'
    },
    ContainerCardButton: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: -7
    },
    ColCardButton: {
        width: '50%'
    },
    MarginCardButton: {
        margin: 7
    },
    CardButtonImageSelected: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#DD6E42',
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    CardButtonImageUnselected: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        borderRadius: 10,
        width: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ContainerTextCardButton: {
        marginTop: 10,
        alignItems: 'center'
    },
    ContainerProgressBar: {
        left: 15,
        right: 15,
        top: 0,
        bottom: 0,
        position: 'absolute',
        justifyContent: 'center',
        backgroundColor: 'rgba(240, 241, 241, 0.8)'
    },
    ContainerSafeArea: {
        flex: 1
    }
});