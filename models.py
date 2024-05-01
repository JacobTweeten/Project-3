from sqlalchemy.ext.automap import automap_base
from sqlalchemy.schema import MetaData


class AutoModels:
    def __init__(self, engine):
        self._base = None
        self._engine = engine

    async def get(self, table_name: str):
        if not self._base:
            await AutoModels._async_init()
        return getattr(self._base.classes, table_name, None)

    async def _async_init(self):
        async with self._engine.connect() as conn:
            metadata = MetaData()
            await conn.run_sync(metadata.reflect)
            self._base = automap_base(metadata=metadata)
            self._base.prepare()

    @staticmethod
    async def create(engine):
        instance = AutoModels(engine)
        await instance._async_init()
        return instance