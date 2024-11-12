class Base:
    def __class_getitem__(cls, item):
        try:
            return getattr(cls, item)
        except AttributeError as e:
            raise KeyError from e
