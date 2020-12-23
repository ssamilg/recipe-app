import firestore from '@react-native-firebase/firestore';

// ID'ye gore tarifi guncelleyen method 
export function refreshRecipeById(recipeId) {
  return async function(dispatch, getState) {
    return firestore()
            .collection('Recipes')
            .doc(recipeId)
            .get();
          };
}