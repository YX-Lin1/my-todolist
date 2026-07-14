import { useI18n } from "@surgeteam/i18n/use-i18n";

type TodoStatsProps = {
  total: number;
  done: number;
  pending: number;
}

export function TodoStats({
  total,
  done,
  pending,
}: TodoStatsProps) {
  const { t } = useI18n();

  if (total === 0) {
    return null;
  }

  return (
    <div className="absolute right-[20px] bottom-[5px] text-right text-[#666] text-[14px]">
      <p>
        {t("todolists.stats", {
          total: String(total),
          done: String(done),
          pending: String(pending),
        })}
      </p>
    </div>
  )
}