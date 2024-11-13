class Base:
    def __class_getitem__(cls, item):
        return getattr(cls, item)
