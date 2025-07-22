const controllers = new Map();

export const addRequestController = (key, controller)=>{
  if (controllers.has(key)){
    controllers.get(key).abort();
  }
  controllers.set(key, controller);
};

export const cancelRequest = (key)=>{
  const controller = controllers.get(key);
  if (controller){
    controller.abort();
    controllers.delete(key);
  }
};