def list_to_dict_list(model_list):
    target_list = []
    for model in model_list:
        target_list.append(model.as_dict())
    return target_list