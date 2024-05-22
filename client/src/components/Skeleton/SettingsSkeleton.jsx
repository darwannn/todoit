import Skeleton from 'react-loading-skeleton';

const SettingsSkeleton = () => {
  return (
    <div className="w-full lg:w-3/4 flex flex-col gap-5">
      <div>
      <Skeleton height={50} width="100%" />
      <Skeleton height={350} width="100%" />
      </div><div>
      <Skeleton height={50} width="100%" />
      <Skeleton height={150} width="100%" />
      </div><div>
      <Skeleton height={50} width="100%" />
      <Skeleton height={150} width="100%" />
      </div><div>
      <Skeleton height={50} width="100%" />
      <Skeleton height={250} width="100%" />
      </div>
    </div>
  );
};

export default SettingsSkeleton;