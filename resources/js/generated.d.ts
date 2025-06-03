declare namespace App.Enums {
export type Feature = 'teams';
export type Language = 'en' | 'en_PH';
}
declare namespace Module.Kanban.DTOs {
export type BoardData = {
id: number;
title: string;
};
export type CardData = {
id: number;
column: Module.Kanban.DTOs.ColumnData;
content: string | null;
media_card: string | null;
media_type: string | null;
};
export type ColumnData = {
title: string;
board: Module.Kanban.DTOs.BoardData;
};
}
declare namespace Modules.Team.DTOs {
export type TeamData = {
id: number;
name: string;
};
export type TeamModuleData = {
has_team: boolean;
teams: Array<Modules.Team.DTOs.TeamData>;
current_team: Modules.Team.DTOs.TeamData;
};
}
