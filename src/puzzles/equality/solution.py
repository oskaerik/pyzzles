class X:
    singleton = None
    
    def __new__(cls, *args, **kwargs):
        if cls.singleton is None:
            cls.singleton = super().__new__(cls)
        return cls.singleton

    def __eq__(self, other):
        return False
